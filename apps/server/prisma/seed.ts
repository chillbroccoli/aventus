import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

import { logger } from "../src/utils/logger";

const prisma = new PrismaClient();

const tags = [
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "remix",
  "vue",
  "angular",
  "svelte",
  "solid",
  "ember",
  "node",
  "deno",
  "bun",
  "graphql",
  "frontend",
  "backend",
  "fullstack",
  "docker",
  "kubernetes",
  "aws",
  "c",
  "c++",
  "c#",
  "python",
  "java",
  "go",
  "rust",
  "php",
  "ruby",
  "scala",
  "elixir",
  "clojure",
  "haskell",
  "erlang",
  "html",
  "css",
  "sass",
  "less",
  "stylus",
  "tailwind",
  "bootstrap",
  "bulma",
  "material-ui",
  "chakra-ui",
  "ant-design",
  "react-native",
  "flutter",
  "ionic",
  "android",
  "ios",
  "windows",
  "linux",
  "macos",
  "git",
  "bash",
  "zsh",
  "powershell",
  "expo",
  "laravel",
  "rails",
  "spring",
  "express",
  "fastify",
  "nest",
  "adonis",
  "sails",
  "koa",
  "django",
  "flask",
  "phoenix",
];

export const seed = async () => {
  const password = await argon2.hash("Password123!");

  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  const createTags = tags.map((tag) =>
    prisma.tag.create({
      data: {
        name: tag,
      },
    })
  );

  await prisma.$transaction(createTags);

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
    },
  });
};

seed()
  .then(async () => {
    logger.info("Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
