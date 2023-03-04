# Todos

- [x] Implement infinite query for Projects Feed, take only 5/10 projects, then fetch more projects, after user scroll
- [x] Updating project
- [x] Updating comment
- [x] Implement displaying projects for specific tag
- [x] Export Forms to Form components
- [x] Remove `Title` components where they are not needed, change their order where needed
- [x] Add `refetchOnWindowsFocus: false` to useQueries where it could help
- [ ] Server, move `comments`, from `Project` resource, to it's own resource
      ~~- Fix `.env` variables problem when building next app~~
- [x] Move `Project` prefix specific components, to new folders, e.g `atoms/ProjectComponent` to `atoms/project/Component`
- [x] Change naming convenction for services in client app e.g
      `APIService` -> `Fetcher`
      and then have one `api` file to export all services e.g
      `api.project.findOne`
      ~~Probably finding a way to do similiar thing for server, to not use `ProjectController`, `ProjectService`~~
- [ ] If possible add absolute paths for server app
- [x] Refactor components in client, move chunks of code if it does make sense
      ~~add middleware for client to redirect users when they try to access protected routes~~
      added route guard instead
- [ ] add schemas for server routes, body/response etc
- [x] fix problems with refetching comments
- [ ] update readme.md
- [x] proper regex for password
      ~~fix avatar picker with initial value~~
- [x] add search page
