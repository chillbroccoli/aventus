import { ClientRoutes } from "shared/constants";

export const profileNav = [
  { name: "Settings", href: ClientRoutes.SETTINGS },
  { name: "New Project", href: ClientRoutes.NEW_PROJECT },
  { name: "My Projects", href: ClientRoutes.MY_PROJECTS },
  { name: "Reading List", href: ClientRoutes.READING_LIST },
];

export const newProjectTextEditorDefaultContent =
  "<p>Example structure...</p><p>(Not all points need to be met, just an example structure)</p><ol><li><p>Project Instructions</p></li><li><p>User Stories</p></li><li><p>Ideas, for example, this [package / library / framework] might be useful for this project</p></li><li><p>Helpful Links</p></li><li><p>Example Projects</p></li></ol>";
