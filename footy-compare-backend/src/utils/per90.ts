export function per90(v: number | null | undefined, minutes: number | null | undefined) {
  if (!minutes || minutes <= 0 || v == null) return 0;
  return (v / minutes) * 90;
}
