import { comment } from "./services/comment.api";
import { project } from "./services/project.api";
import { tag } from "./services/tag.api";
import { user } from "./services/user.api";

export const api = {
  user,
  tag,
  project,
  comment,
};
