export function generateSeed() {
  return (Math.random() + 1)
    .toString(36)
    .substring(Math.floor(Math.random() * (7 - 2 + 1) + 2));
}
