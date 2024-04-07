export function getRandomNumberExclusive(start: number, end: number): number {
  return Math.floor(Math.random() * (end - start)) + start
}

export function getRandomNumberExc(end: number): number {
  return getRandomNumberExclusive(0, end)
}

export function getRandomCoupleNumberExc(end: number): [number, number] {
  return [getRandomNumberExclusive(0, end), getRandomNumberExclusive(0, end)]
}
