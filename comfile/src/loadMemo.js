export function loadMemo() {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  return memos;
}
