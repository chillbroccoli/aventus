export enum APIRoutes {
  HEALTHCHECK = "/healthcheck",
  TAGS = "/api/tags",
  PROJECTS = "/api/projects",
  PROJECT = "/api/projects/:id",
  USERS = "/api/users",
  LOGIN = "/api/users/login",
  LOGOUT = "/api/users/logout",
  ME = "/api/users/me",
}

export enum ClientRoutes {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  SETTINGS = "/settings",
  READING_LIST = "/reading-list",
  TAGS = "/tags",
  TAG = "/tags/:tag",
  PROJECT = "/projects/:id",
  NEW_PROJECT = "/projects/new",
}
