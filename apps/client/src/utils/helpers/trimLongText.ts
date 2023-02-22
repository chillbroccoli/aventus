export function trimLongText(text: string, length?: number) {
  length = length || 200;

  return text.length > length ? text.substring(0, length - 3) + "..." : text;
}
