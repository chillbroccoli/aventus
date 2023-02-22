export function getInitials(firstName: string, lastName: string) {
  return `${firstName} ${lastName}`
    .split(" ")
    .map((word: string) => word[0])
    .join("");
}
