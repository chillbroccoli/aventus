export function trimLongText(text: string, length?: number) {
  return text.length > (length ?? 200)
    ? text.substring(0, (length ?? 200) - 3) + "..."
    : text;
}
