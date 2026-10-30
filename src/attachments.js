// Storage object keys must be ASCII. Keep the original filename in metadata for display.
export function attachmentPath(ownerId, folder, originalName) {
  if (![ownerId, folder].every((part) => /^[A-Za-z0-9_-]+$/.test(part || ""))) {
    throw new Error("첨부파일 저장 경로를 확인할 수 없습니다. 다시 로그인해 주세요.");
  }
  const extension = /\.([a-z0-9]{1,10})$/i.exec(String(originalName || "").trimEnd())?.[1].toLowerCase();
  return `${ownerId}/${folder}/${crypto.randomUUID()}${extension ? `.${extension}` : ""}`;
}

export async function uploadAttachments(client, bucket, ownerId, fileList, folder) {
  const uploaded = [];
  for (const file of Array.from(fileList || []).filter((entry) => entry.size > 0)) {
    const path = attachmentPath(ownerId, folder, file.name);
    let url = "";
    if (client) {
      const storage = client.storage.from(bucket);
      const { error } = await storage.upload(path, file, {
        contentType: file.type || "application/octet-stream", upsert: false
      });
      if (error) throw new Error(`‘${file.name}’ 업로드 실패: ${error.message}`, { cause: error });
      url = storage.getPublicUrl(path).data.publicUrl;
    }
    uploaded.push({ name: file.name, type: file.type, size: file.size, path, url });
  }
  return uploaded;
}
