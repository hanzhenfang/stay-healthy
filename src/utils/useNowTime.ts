export function getNowDate(subtractDay: number = 0) {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    getDoubleSeconds(date.getDate() - subtractDay) +
    " " +
    getDoubleSeconds(date.getHours()) +
    ":" +
    getDoubleSeconds(date.getMinutes())
  );
}

export function getDoubleSeconds(theDate: number) {
  let _second = theDate.toString();
  if (_second.length < 2) {
    _second = "0" + _second;
  }
  return _second;
}
