import { renderStartupError, withTimeout } from "./startup.js";

async function bootstrap() {
  try {
    const { startApp } = await withTimeout(
      import("./main.js"),
      "화면 파일을 불러오는 시간이 초과됐습니다."
    );
    await startApp();
  } catch (error) {
    console.error("Application startup failed:", error);
    renderStartupError();
  }
}

bootstrap();
