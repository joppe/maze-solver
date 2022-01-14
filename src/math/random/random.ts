export function random(min: number, max: number): number {
  return min + Math.round((max - min) * Math.random());
}
