import { ParsedQuery } from "query-string";

export interface ParamsWithSlug extends ParsedQuery {
  slug: string;
}
