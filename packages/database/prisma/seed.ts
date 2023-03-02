import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

const prisma = new PrismaClient();

export const tagList = [
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
  const hashedPassword = await argon2.hash("password");

  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const createTags = tagList.map((tag) =>
    prisma.tag.create({
      data: {
        name: tag,
      },
    })
  );

  const tags = await prisma.$transaction(createTags);

  const userData = Array(10)
    .fill(null)
    .map(() => ({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: hashedPassword,
      avatar: faker.internet.avatar(),
    }));

  const createUsers = userData.map((user) =>
    prisma.user.create({
      data: user,
    })
  );

  const users = await prisma.$transaction(createUsers);

  const projects = [];

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      projects.push({
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(8),
        content: faker.lorem.paragraphs(5),
        slug: faker.lorem.slug(),
        user: {
          connect: {
            id: users[i].id,
          },
        },
        // Connect 3 random tags to each project
        tags: {
          connect: [
            {
              id: faker.datatype.number({
                min: tags[0].id,
                max: tags.slice(-1)[0].id,
              }),
            },
            {
              id: faker.datatype.number({
                min: tags[0].id,
                max: tags.slice(-1)[0].id,
              }),
            },
            {
              id: faker.datatype.number({
                min: tags[0].id,
                max: tags.slice(-1)[0].id,
              }),
            },
          ],
        },
      });
    }
  }

  const createProjects = projects.map((project) =>
    prisma.project.create({
      data: project,
    })
  );

  await prisma.$transaction(createProjects);

  await prisma.user.upsert({
    where: {
      email: "user@example.com",
    },
    update: {},
    create: {
      name: "johndoe",
      email: "user@example.com",
      password: hashedPassword,
      role: "USER",
      avatar: faker.internet.avatar(),
    },
  });

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "ADMIN",
      avatar:
        "https://pbs.twimg.com/profile_images/1498042411444051975/JLTc5ngd_400x400.jpg",
    },
  });
};

seed()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log("Seeding complete");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
