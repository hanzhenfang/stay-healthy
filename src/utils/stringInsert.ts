//用法: 在字符串后传入制定的字符串
//@params: 1.传入的字符串 2.在字符串的那个索引值后开始插入 3.插入的字符串
export function insertString(
  oldStr: string,
  start: number,
  wantInsertString: string
) {
  if (!oldStr) return;
  const _firstSection = oldStr.slice(0, start);
  const _lastSection = oldStr.slice(start);
  const newName = _firstSection + wantInsertString + _lastSection;
  return newName;
}
