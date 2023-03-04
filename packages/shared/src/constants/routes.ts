export enum APIRoutes {
  TAGS = "/api/tags",
  USERS = "/api/users",
  LOGIN = "/api/users/login",
  LOGOUT = "/api/users/logout",
  DETAILS = "/api/users/details",
  PROJECTS = "/api/projects",
  PROJECT = "/api/projects/:slug",
  FEED = "/api/projects/feed",
  COMMENTS = "/api/projects/:slug/comments",
  COMMENT = "/api/projects/:slug/comments/:id",
  PROJECT_STATS = "/api/projects/:slug/stats",
  LIKE_PROJECT = "/api/projects/:slug/like",
  BOOKMARK_PROJECT = "/api/projects/:slug/bookmark",
}

export enum ClientRoutes {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  SETTINGS = "/settings",
  READING_LIST = "/reading-list",
  TAGS = "/tags",
  TAG = "/tags/:tag",
  PROJECT = "/projects/:slug",
  EDIT_PROJECT = "/projects/:slug/edit",
  NEW_PROJECT = "/projects/new",
  MY_PROJECTS = "/projects/my-projects",
  SEARCH = "/search",
}

export const PROTECTED_ROUTES = [ClientRoutes.SETTINGS];
