const LATEST_VERSION = "payment-transfer-date-1";
const params = new URLSearchParams(location.search);
const currentVersion = params.get("v") || "";
const oldVersion = currentVersion && currentVersion !== LATEST_VERSION;

if (oldVersion && !sessionStorage.getItem(`haka_latest_redirect_${LATEST_VERSION}`)) {
  sessionStorage.setItem(`haka_latest_redirect_${LATEST_VERSION}`, "1");
  const next = new URL(location.href);
  next.searchParams.set("v", LATEST_VERSION);
  location.replace(next.toString());
}
