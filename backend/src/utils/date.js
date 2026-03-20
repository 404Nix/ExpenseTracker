export const monthRangeUtc = (month) => {
  const [year, monthIndex] = month.split("-").map(Number);

  const start = new Date(Date.UTC(year, monthIndex - 1, 1));

  const end = new Date(Date.UTC(year, monthIndex, 1));

  return { start, end };
}