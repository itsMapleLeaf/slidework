export default function lerp(a: number, b: number, delta: number) {
  return b + (a - b) * delta
}
