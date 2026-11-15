const formatter = new Intl.NumberFormat('de-DE');

export function formatVnd(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  return `${sign}${formatter.format(Math.abs(amount))}đ`;
}
