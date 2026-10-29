import { readFile, writeFile, mkdir, rename, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, dirname, join } from "node:path";

const snapshotPath = resolve(process.argv[2] || ".private-backups/2026-10-29/application-snapshot.json");
const snapshot = JSON.parse(await readFile(snapshotPath, "utf8"));
if (snapshot.project_ref !== "yqemtsbdnypgmkuyncxh") throw new Error("Unexpected project");
const root = dirname(snapshotPath);
await mkdir(join(root, "objects"), { recursive: true });
const entries = [];
const failures = [];
let cursor = 0;
let bytes = 0;

async function copyObject(object) {
  const bucket = snapshot.storage_buckets.find((entry) => entry.id === object.bucket_id);
  if (!bucket?.public) throw new Error("Bucket requires authenticated backup");
  const key = `${object.bucket_id}/${object.name}`;
  const filename = createHash("sha256").update(key).digest("hex");
  const target = join(root, "objects", filename);
  const expectedSize = Number(object.metadata?.size);
  let body;
  try {
    if ((await stat(target)).size === expectedSize) body = await readFile(target);
  } catch {}
  if (!body) {
    const url = `https://${snapshot.project_ref}.supabase.co/storage/v1/object/public/${key.split("/").map(encodeURIComponent).join("/")}`;
    let lastError;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        body = Buffer.from(await response.arrayBuffer());
        break;
      } catch (error) { lastError = error; }
    }
    if (!body) throw lastError;
    if (Number.isFinite(expectedSize) && body.length !== expectedSize) throw new Error("Size mismatch");
    await writeFile(`${target}.partial`, body, { mode: 0o600 });
    await rename(`${target}.partial`, target);
  }
  bytes += body.length;
  entries.push({ bucket: object.bucket_id, key: object.name, file: `objects/${filename}`, bytes: body.length, sha256: createHash("sha256").update(body).digest("hex") });
  if (entries.length % 50 === 0) console.log(`Copied and hashed ${entries.length}/${snapshot.storage_objects.length} files`);
}

await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < snapshot.storage_objects.length) {
    const object = snapshot.storage_objects[cursor++];
    try { await copyObject(object); }
    catch (error) { failures.push({ bucket: object.bucket_id, key: object.name, error: error.message }); }
  }
}));
const manifest = {
  captured_at: snapshot.captured_at, verified_at: new Date().toISOString(),
  kind: "application-export-and-storage-copy", database_restore_tested: false,
  snapshot_sha256: createHash("sha256").update(await readFile(snapshotPath)).digest("hex"),
  tables: Object.fromEntries(Object.entries(snapshot.tables).map(([name, rows]) => [name, rows.length])),
  expected_objects: snapshot.storage_objects.length, copied_objects: entries.length, bytes,
  objects: entries.sort((a, b) => `${a.bucket}/${a.key}`.localeCompare(`${b.bucket}/${b.key}`)), failures
};
await writeFile(join(root, "manifest.json"), JSON.stringify(manifest, null, 2), { mode: 0o600 });
console.log(JSON.stringify({ expected: manifest.expected_objects, copied: entries.length, bytes, failed: failures.length, database_restore_tested: false }));
if (failures.length) process.exitCode = 1;
