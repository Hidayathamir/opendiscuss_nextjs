export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
