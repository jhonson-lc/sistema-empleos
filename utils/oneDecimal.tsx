export default function oneDecimal(number) {
  return (Math.round(number * 10) / 10).toFixed(1);
}
