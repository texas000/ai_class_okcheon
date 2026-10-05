// SSE(Server-Sent Events)는 서버가 데이터를 조금씩 보내는 형식입니다.
// 한 이벤트는 'data: 내용'으로 시작하고 빈 줄로 끝납니다.
// 서버와 브라우저에서 같은 함수를 사용해 스트림을 이벤트별로 읽습니다.
export async function* readEventStream(stream) {
  const reader = stream.getReader();
  // 한글 한 글자의 바이트가 여러 조각으로 도착해도 깨지지 않게 복원합니다.
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines = [];
  let eventLength = 0;

  function takeLine(line) {
    if (line.endsWith("\r")) line = line.slice(0, -1);
    if (line === "") {
      const event = dataLines.length ? dataLines.join("\n") : null;
      dataLines = [];
      eventLength = 0;
      return event;
    }
    // 주석(:), event, id 등의 필드는 여기서 표시하지 않습니다.
    if (line.startsWith("data:")) {
      const data = line.slice(5).replace(/^ /, "");
      eventLength += data.length;
      if (eventLength > 200_000)
        throw new Error("스트림 이벤트가 너무 큽니다.");
      dataLines.push(data);
    }
    return null;
  }

  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += done
        ? decoder.decode()
        : decoder.decode(value, { stream: true });
      let newline;
      while ((newline = buffer.indexOf("\n")) !== -1) {
        const event = takeLine(buffer.slice(0, newline));
        buffer = buffer.slice(newline + 1);
        if (event !== null) yield event;
      }
      if (buffer.length > 200_000)
        throw new Error("스트림 이벤트가 너무 큽니다.");
      if (done) {
        if (buffer) takeLine(buffer);
        const event = takeLine("");
        if (event !== null) yield event;
        break;
      }
    }
  } finally {
    // 완료 또는 중단 시 읽기 연결을 정리합니다.
    await reader.cancel().catch(() => {});
    reader.releaseLock();
  }
}
