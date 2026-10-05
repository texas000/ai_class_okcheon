import test from "node:test";
import assert from "node:assert/strict";
import { readEventStream } from "../lib/event-stream.js";

test("SSE는 쪼개진 한글, CRLF, 여러 이벤트와 주석을 복원", async () => {
  const bytes = new TextEncoder().encode(
    ': keep-alive\r\nevent: message\r\ndata: {"delta":"안녕😊"}\r\n\r\ndata: {"done":true}\n\n',
  );
  let index = 0;
  const stream = new ReadableStream({
    pull(controller) {
      // 한 바이트씩 보내 한글, 이모지, CRLF 경계를 모두 쪼갭니다.
      if (index < bytes.length) controller.enqueue(bytes.slice(index, ++index));
      else controller.close();
    },
  });
  const events = [];
  for await (const event of readEventStream(stream))
    events.push(JSON.parse(event));
  assert.deepEqual(events, [{ delta: "안녕😊" }, { done: true }]);
});

test("한 조각에 합쳐진 이벤트, 여러 data 줄과 마지막 줄을 처리", async () => {
  const stream = new Response("data: first\ndata: second\n\ndata: last").body;
  const events = [];
  for await (const event of readEventStream(stream)) events.push(event);
  assert.deepEqual(events, ["first\nsecond", "last"]);
});

test("너무 큰 이벤트는 거부", async () => {
  for (const source of [
    "data: " + "x".repeat(200_001),
    "data: " + "x".repeat(110_000) + "\ndata: " + "x".repeat(110_000) + "\n\n",
  ]) {
    await assert.rejects(async () => {
      for await (const event of readEventStream(new Response(source).body))
        void event;
    }, /너무 큽니다/);
  }
});
