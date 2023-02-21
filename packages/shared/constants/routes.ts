export enum APIRoutes {
  HEALTHCHECK = "/healthcheck",
  TAGS = "/api/tags",
  PROJECTS = "/api/projects",
  PROJECT = "/api/projects/:id",
  USERS = "/api/users",
  LOGIN = "/api/users/login",
  ME = "/api/users/me",
}

export enum ClientRoutes {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  TAGS = "/tags",
  TAG = "/tags/:tag",
  PROJECT = "/projects/:id",
}
