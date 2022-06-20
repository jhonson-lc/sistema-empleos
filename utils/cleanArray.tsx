export default function cleanArray(array: [], key: string = "-") {
  return array
    .filter((item: string) => item || undefined)
    .toString()
    .replaceAll(",", key);
}
