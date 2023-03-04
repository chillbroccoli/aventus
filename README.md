# Aventus

Aventus, an application where you can post your project ideas, project ideas for you or someone's next project, made for all of us developers, that cannot come up with idea what to do, what to build.

## What's inside?

Aventus is build on top of Turborepo.

### Apps and Packages

- `client`: Frontend for Aventus, built with Next.js
- `server`: Backend for Aventus, built with Fastify
- `shared`: Shared package to store schemas, types and constants
- `database`: Prisma database

### Required dependencies

- Node >= 14.0
- yarn >= 1.22.19

### Pre

Before getting started, you need to copy `.env.example` in the root of the project, to `.env`, and then fill out blank variables

### Get Started

To get started first you need to install all packages

Run in the root of the project

```
yarn
```

### Build

To build all apps and packages, run the following command at the root of the project:

```
yarn run build
```

### Develop

To develop all apps and packages, run the following command at the root of the project:

```
yarn run dev
```
