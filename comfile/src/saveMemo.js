export function saveMemo(newMemo) {
  const memos = JSON.parse(localStorage.getItem("memos")) || [];
  memos.push(newMemo);
  localStorage.setItem("memos", JSON.stringify(memos));
}
