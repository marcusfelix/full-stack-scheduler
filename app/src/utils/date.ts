export const compareDates = (a: Date | null, b: Date | null) => {
  return a?.getFullYear() === b?.getFullYear() && a?.getMonth() === b?.getMonth() && a?.getDate() === b?.getDate()
}