(() => {
  if (window.__hakaUploadFilenameFix) return;
  window.__hakaUploadFilenameFix = true;

  const originalGetAll = FormData.prototype.getAll;
  const originalGet = FormData.prototype.get;

  function extensionOf(name, type) {
    const match = String(name || "").match(/\.([A-Za-z0-9]{1,10})$/);
    if (match) return `.${match[1].toLowerCase()}`;
    if (type === "application/pdf") return ".pdf";
    if (String(type || "").includes("jpeg")) return ".jpg";
    if (String(type || "").includes("png")) return ".png";
    if (String(type || "").includes("heic")) return ".heic";
    if (String(type || "").includes("heif")) return ".heif";
    return "";
  }

  function asciiName(file) {
    const ext = extensionOf(file.name, file.type);
    const base = String(file.name || "file")
      .replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9._-]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 40);
    const safeBase = base && /[A-Za-z0-9]/.test(base) ? base : "upload_file";
    const stamp = Date.now().toString(36);
    return `${safeBase}_${stamp}${ext}`;
  }

  function normalizeFile(value) {
    if (!(value instanceof File)) return value;
    if (/^[A-Za-z0-9._-]+$/.test(value.name)) return value;
    const renamed = new File([value], asciiName(value), {
      type: value.type || "application/octet-stream",
      lastModified: value.lastModified || Date.now()
    });
    Object.defineProperty(renamed, "originalName", { value: value.name, enumerable: false });
    return renamed;
  }

  FormData.prototype.getAll = function patchedGetAll(name) {
    return originalGetAll.call(this, name).map(normalizeFile);
  };

  FormData.prototype.get = function patchedGet(name) {
    return normalizeFile(originalGet.call(this, name));
  };

  document.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "file" || !input.files?.length) return;
    const hasKorean = Array.from(input.files).some((file) => /[^A-Za-z0-9._ -]/.test(file.name));
    if (!hasKorean) return;
    let note = input.parentElement?.querySelector(".upload-filename-note");
    if (!note) {
      note = document.createElement("small");
      note.className = "upload-filename-note";
      input.insertAdjacentElement("afterend", note);
    }
    note.textContent = "한글 파일명은 업로드 시 안전한 영문 파일명으로 자동 변환됩니다.";
  }, true);

  const style = document.createElement("style");
  style.textContent = `
    .upload-filename-note {
      display: block;
      margin-top: 6px;
      color: #237c63;
      font-size: 12px;
      font-weight: 800;
      line-height: 1.4;
    }
  `;
  document.head.appendChild(style);
})();
