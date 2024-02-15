export function formatDate(date) {
  const d = new Date(date);
  const formattedDate = `${
    d.getMonth() + 1
  }/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
}
