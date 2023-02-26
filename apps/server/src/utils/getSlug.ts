import slugify from "slugify";

export function getSlug(title: string) {
  return slugify(title, { lower: true, replacement: "-" }).concat(
    "-",
    (Math.random() + 1).toString(36).substring(2)
  );
}
