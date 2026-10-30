// Read every page. A failed page must never produce a believable partial total.
export async function readTable(client, name, columns = "*", pageSize = 500) {
  const rows = [];
  for (let offset = 0; ; offset += pageSize) {
    const result = await client.from(name).select(columns).order("id", { ascending: true }).range(offset, offset + pageSize - 1);
    if (result.error) return { data: null, error: result.error };
    rows.push(...(result.data || []));
    if ((result.data || []).length < pageSize) break;
  }
  return { data: rows, error: null };
}

export async function updatePendingPayment(client, original, payload) {
  let query = client.from("payments").update(payload).eq("id", original.id).eq("status", "신청");
  if (Number.isInteger(original.row_version)) return await query.eq("row_version", original.row_version).select("id").maybeSingle();
  // Compare the row the user actually edited, including its attachment metadata.
  // A concurrent edit or approval makes this update affect zero rows.
  for (const [column, value] of Object.entries(original)) {
    if (column === "id" || column === "status") continue;
    query = value === null ? query.is(column, null) : query.eq(column, typeof value === "object" ? JSON.stringify(value) : value);
  }
  return await query.select("id").maybeSingle();
}

export async function changePendingStatus(client, original, status, reason = "") {
  if (!Number.isSafeInteger(original.row_version)) throw new Error("신청 버전을 확인할 수 없습니다. 새로고침 후 다시 검토해 주세요.");
  const payload = { status };
  if (status === "취소") payload.cancel_reason = reason;
  if (status === "반려") payload.rejection_reason = reason;
  let query = client.from("payments").update(payload).eq("id", original.id).eq("status", "신청");
  query = query.eq("row_version", original.row_version);
  return await query.select("id").maybeSingle();
}
