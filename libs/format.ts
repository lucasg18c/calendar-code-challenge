export function formatDate(date: Date, showDay: boolean = false): string {
  const monthString = date
    .toLocaleString("en-US", { month: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());
  const yearString = date.getFullYear();

  if (showDay) {
    const dayString = date.getDate();
    return `${monthString} ${dayString}, ${yearString}`;
  }
  return `${monthString} ${yearString}`;
}
