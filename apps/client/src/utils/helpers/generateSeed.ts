export function generateSeed(max = 7, min = 2) {
  return (Math.random() + 1)
    .toString(36)
    .substring(Math.floor(Math.random() * (max - min + 1) + min));
}
