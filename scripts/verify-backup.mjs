import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
const root = resolve(process.argv[2] || ".private-backups/2026-10-29");
const snapshotBytes = await readFile(join(root, "application-snapshot.json"));
const snapshot = JSON.parse(snapshotBytes);
const manifest = JSON.parse(await readFile(join(root, "manifest.json")));
assert.equal(createHash("sha256").update(snapshotBytes).digest("hex"), manifest.snapshot_sha256);
assert.equal(manifest.failures.length, 0);
assert.equal(manifest.expected_objects, manifest.copied_objects);
for (const [name, rows] of Object.entries(snapshot.tables)) assert.equal(rows.length, manifest.tables[name]);
for (const object of manifest.objects) {
  const file = resolve(root, object.file);
  assert.ok(file.startsWith(root + "/") || file.startsWith(root + "\\"));
  assert.equal((await stat(file)).size, object.bytes);
  assert.equal(createHash("sha256").update(await readFile(file)).digest("hex"), object.sha256);
}
console.log(JSON.stringify({ verified_tables: Object.keys(snapshot.tables).length, verified_objects: manifest.objects.length, verified_bytes: manifest.bytes, database_restore_tested: false }));
