export default function multilineText(value: string) {
  return value
    .split('\n')
    .map(el => el.trim())
    .join('\n');
}
