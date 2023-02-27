# Todos

- [ ] Implement infinite query for Projects Feed, take only 5 projects, then fetch more projects, after user scroll
- [ ] Implement displaying projects for specific tag
- [ ] Export Forms to Form components
- [ ] Remove `Title` components where they are not needed, change their order where needed
- [ ] Add `refetchOnWindowsFocus: false` to useQueries where it could help
- [ ] Move `comments`, from `Project` resource, to it's own resource
- [ ] Fix `.env` variables problem when building next app
- [x] Move `Project` prefix specific components, to new folders, e.g `atoms/ProjectComponent` to `atoms/project/Component`
- [ ] Change naming convenction for services in client app e.g
      `APIService` -> `Fetcher`
      and then have one `api` file to export all services e.g
      `api.project.findOne`
- [ ] Probably finding a way to do similiar thing for server, to not use `ProjectController`, `ProjectService`
- [ ] If possible add absolute paths for server app
- [ ] Refactor components in client, move chunks of code if it does make sense
- [ ] add middleware for client to redirect users when they try to access protected routes
- [ ] add schemas for server routes, body/response etc
