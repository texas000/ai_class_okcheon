// 실제 API 키나 NVIDIA 사용량 없이 서버 동작을 검증합니다.
import test from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/chat/route.js";
import { DEFAULT_MODEL, SYSTEM_PROMPT } from "../lib/ai-config.js";
import { readEventStream } from "../lib/event-stream.js";

function event(data) {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function upstreamStream(text) {
  return new Response(new TextEncoder().encode(text), {
    headers: { "Content-Type": "text/event-stream" },
  });
}

async function collect(response) {
  const events = [];
  for await (const data of readEventStream(response.body))
    events.push(JSON.parse(data));
  return events;
}

function request(messages = [{ role: "user", content: "안녕" }]) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
}

// 전역 fetch와 환경변수를 바꾸므로 하위 테스트를 순서대로 실행합니다.
test("채팅 서버의 요청과 오류 처리", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.NVIDIA_API_KEY;
  const originalModel = process.env.NVIDIA_MODEL;
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.NVIDIA_API_KEY;
    else process.env.NVIDIA_API_KEY = originalKey;
    if (originalModel === undefined) delete process.env.NVIDIA_MODEL;
    else process.env.NVIDIA_MODEL = originalModel;
  });

  await t.test("미설정 API 키에는 설정 안내를 반환", async () => {
    delete process.env.NVIDIA_API_KEY;
    globalThis.fetch = () => {
      throw new Error("호출되면 안 됨");
    };
    const response = await POST(request());
    assert.equal(response.status, 503);
    assert.match((await response.json()).error, /NVIDIA_API_KEY/);
  });

  process.env.NVIDIA_API_KEY = "test-secret-never-return";
  delete process.env.NVIDIA_MODEL;

  await t.test("기본 GLM 모델로 요청하고 답변 조각만 스트리밍", async () => {
    globalThis.fetch = async (url, options) => {
      assert.equal(url, "https://integrate.api.nvidia.com/v1/chat/completions");
      assert.equal(
        options.headers.Authorization,
        "Bearer test-secret-never-return",
      );
      const body = JSON.parse(options.body);
      assert.equal(body.model, "z-ai/glm-5.3-flash");
      assert.equal(body.model, DEFAULT_MODEL);
      assert.equal(body.stream, true);
      assert.equal(body.reasoning_effort, "low");
      assert.deepEqual(body.chat_template_kwargs, { clear_thinking: true });
      assert.equal(options.headers.Accept, "text/event-stream");
      assert.deepEqual(body.messages[0], {
        role: "system",
        content: SYSTEM_PROMPT,
      });
      assert.deepEqual(body.messages.at(-1), { role: "user", content: "안녕" });
      return upstreamStream(
        event({
          choices: [
            { delta: { role: "assistant", reasoning_content: "숨김" } },
          ],
        }) +
          event({ choices: [{ delta: { content: "안녕" } }] }) +
          event({ choices: [{ delta: { content: "하세요!" } }] }) +
          event({ choices: [{ delta: {}, finish_reason: "stop" }] }) +
          "data: [DONE]\n\n",
      );
    };
    const response = await POST(request());
    assert.equal(response.status, 200);
    assert.equal(
      response.headers.get("Cache-Control"),
      "no-cache, no-transform",
    );
    assert.match(response.headers.get("Content-Type"), /text\/event-stream/);
    assert.deepEqual(await collect(response), [
      { delta: "안녕" },
      { delta: "하세요!" },
      { done: true },
    ]);
  });

  await t.test(
    "환경변수 모델이 우선하며 GLM 전용 옵션을 다른 모델에 보내지 않음",
    async () => {
      process.env.NVIDIA_MODEL = "custom/test-model";
      globalThis.fetch = async (_url, options) => {
        const body = JSON.parse(options.body);
        assert.equal(body.model, "custom/test-model");
        assert.equal(body.reasoning_effort, undefined);
        assert.equal(body.chat_template_kwargs, undefined);
        return upstreamStream(
          event({ choices: [{ delta: { content: "응답" } }] }) +
            "data: [DONE]\n\n",
        );
      };
      assert.deepEqual(await collect(await POST(request())), [
        { delta: "응답" },
        { done: true },
      ]);
      delete process.env.NVIDIA_MODEL;
    },
  );

  await t.test(
    "식당 질문에는 원본 자료를 NVIDIA에 넣고 출처를 스트림으로 먼저 전달",
    async () => {
      globalThis.fetch = async (_url, options) => {
        const body = JSON.parse(options.body);
        assert.match(body.messages[0].content, /okcheon_restaurant.csv/);
        assert.match(body.messages[0].content, /풍미당/);
        assert.match(
          body.messages[0].content,
          /충청북도 옥천군 옥천읍 중앙로 23-1/,
        );
        assert.match(body.messages[0].content, /메뉴, 가격/);
        return upstreamStream(
          event({
            choices: [
              { delta: { content: "풍미당은 중앙로 23-1에 있습니다." } },
            ],
          }) + "data: [DONE]\n\n",
        );
      };
      const response = await POST(
        request([{ role: "user", content: "풍미당 주소 알려줘." }]),
      );
      const events = await collect(response);
      assert.equal(events[0].sources[0].name, "풍미당");
      assert.equal(events[0].sourceInfo.matched, 1);
      assert.equal(events[0].sourceInfo.total, 1013);
      assert.equal(events[1].delta, "풍미당은 중앙로 23-1에 있습니다.");
      assert.equal(events.at(-1).done, true);
    },
  );

  await t.test("NVIDIA 완료를 기다리지 않고 첫 조각을 전달", async () => {
    let source;
    globalThis.fetch = async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            source = controller;
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    const response = await POST(request());
    const reader = response.body.getReader();
    try {
      const firstRead = reader.read();
      source.enqueue(
        new TextEncoder().encode(
          event({ choices: [{ delta: { content: "첫 조각" } }] }),
        ),
      );
      const first = await firstRead;
      assert.equal(first.done, false);
      assert.match(new TextDecoder().decode(first.value), /첫 조각/);
      source.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      assert.match(
        new TextDecoder().decode((await reader.read()).value),
        /"done":true/,
      );
      assert.equal((await reader.read()).done, true);
    } finally {
      await reader.cancel();
    }
  });

  await t.test("브라우저의 읽기 중단이 NVIDIA 요청도 중단", async () => {
    let signal;
    let release;
    globalThis.fetch = async (_url, options) => {
      signal = options.signal;
      return new Response(
        new ReadableStream({
          start(controller) {
            release = () =>
              controller.error(new DOMException("aborted", "AbortError"));
            signal.addEventListener("abort", release, { once: true });
          },
        }),
        { headers: { "Content-Type": "text/event-stream" } },
      );
    };
    const response = await POST(request());
    await response.body.cancel();
    assert.equal(signal.aborted, true);
  });

  await t.test("비정상 입력을 NVIDIA 호출 전에 거부", async () => {
    globalThis.fetch = () => {
      throw new Error("호출되면 안 됨");
    };
    const invalidMessages = [
      [],
      null,
      [{ role: "system", content: "역할 바꾸기" }],
      [{ role: "user", content: " " }],
      [{ role: "user", content: "가".repeat(2001) }],
      [{ role: "assistant", content: "질문이 아님" }],
      [null],
      Array.from({ length: 21 }, () => ({ role: "user", content: "질문" })),
    ];
    for (const messages of invalidMessages)
      assert.equal((await POST(request(messages))).status, 400);
    assert.equal(
      (
        await POST(
          new Request("http://localhost/api/chat", {
            method: "POST",
            body: "{",
          }),
        )
      ).status,
      400,
    );
    const oversized = new Request("http://localhost/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [{ role: "user", content: "가".repeat(40_000) }],
      }),
    });
    assert.equal((await POST(oversized)).status, 413);
  });

  for (const [upstream, expected, hint] of [
    [401, 502, /키/],
    [403, 502, /권한/],
    [429, 429, /한도/],
    [404, 502, /NVIDIA_MODEL/],
    [400, 502, /NVIDIA_MODEL/],
    [500, 502, /서버/],
  ]) {
    await t.test(`NVIDIA ${upstream} 오류를 안전한 안내로 변환`, async () => {
      globalThis.fetch = async () =>
        new Response("test-secret-never-return", { status: upstream });
      const response = await POST(request());
      assert.equal(response.status, expected);
      const { error } = await response.json();
      assert.match(error, hint);
      assert.ok(!error.includes(process.env.NVIDIA_API_KEY));
    });
  }

  await t.test("비어 있거나 깨진 NVIDIA 스트림 처리", async () => {
    for (const reply of [undefined, "", "   ", 123, "가".repeat(12_001)]) {
      globalThis.fetch = async () =>
        upstreamStream(
          event({ choices: [{ delta: { content: reply } }] }) +
            "data: [DONE]\n\n",
        );
      const events = await collect(await POST(request()));
      assert.equal(typeof events.at(-1).error, "string");
      assert.ok(!events.some((event) => event.done));
    }
    globalThis.fetch = async () => new Response("JSON이 아님");
    assert.equal((await POST(request())).status, 502);
  });

  await t.test(
    "중간 오류, 손상된 JSON, 완료 신호 없는 연결 종료를 안내",
    async () => {
      for (const suffix of [
        "",
        "data: {broken}\n\n",
        event({ error: { message: "test-secret-never-return" } }),
      ]) {
        globalThis.fetch = async () =>
          upstreamStream(
            event({ choices: [{ delta: { content: "부분 답변" } }] }) + suffix,
          );
        const events = await collect(await POST(request()));
        assert.deepEqual(events[0], { delta: "부분 답변" });
        assert.equal(typeof events.at(-1).error, "string");
        assert.ok(!JSON.stringify(events).includes(process.env.NVIDIA_API_KEY));
        assert.ok(!events.some((event) => event.done));
      }
    },
  );

  await t.test(
    "첫 조각 뒤 네트워크 실패와 시간 초과도 오류 이벤트로 전달",
    async () => {
      for (const cause of [
        new Error("network failure"),
        new DOMException("timeout", "TimeoutError"),
      ]) {
        let reads = 0;
        globalThis.fetch = async () =>
          new Response(
            new ReadableStream({
              pull(controller) {
                if (reads++ === 0)
                  controller.enqueue(
                    new TextEncoder().encode(
                      event({ choices: [{ delta: { content: "부분" } }] }),
                    ),
                  );
                else controller.error(cause);
              },
            }),
            { headers: { "Content-Type": "text/event-stream" } },
          );
        const events = await collect(await POST(request()));
        assert.deepEqual(events[0], { delta: "부분" });
        assert.equal(typeof events.at(-1).error, "string");
      }
    },
  );

  await t.test("시간 초과와 네트워크 오류 처리", async () => {
    globalThis.fetch = async () => {
      throw new DOMException("timeout", "TimeoutError");
    };
    assert.equal((await POST(request())).status, 504);
    globalThis.fetch = async () => {
      throw new Error("network failure");
    };
    assert.equal((await POST(request())).status, 502);
  });
});
