import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";
import slugify from "slugify";

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

const content = `<p>Your challenge is to build out this todo app and get it looking as close to the design as possible.</p><p>You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.</p><p>Your users should be able to:</p><ul><li><p>View the optimal layout for the app depending on their device's screen size</p></li><li><p>See hover states for all interactive elements on the page</p></li><li><p>Add new todos to the list</p></li><li><p>Mark todos as complete</p></li><li><p>Delete todos from the list</p></li><li><p>Filter by all/active/complete todos</p></li><li><p>Clear all completed todos</p></li><li><p>Toggle light and dark mode</p></li><li><p><strong>Bonus</strong>: Drag and drop to reorder items on the list</p></li><li><p><strong>Bonus</strong>: Build this project as a full-stack application</p></li></ul><p>Download the project and go through the <code>README.md</code> file. This will provide further details about the project and help you get set up.</p><p>Want some support on the challenge? <a target="_blank" rel="noopener noreferrer nofollow" class="Text__Wrapper-sc-zbm6r7-0 Link__Wrapper-sc-1e3vyao-0 kILBzh hBFihp" href="https://www.frontendmentor.io/slack">Join our Slack community</a> and ask questions in the help channel.</p>`;

const projects = [
  {
    title: "To-Do App",
    description: "A simple to-do app built with React and Next.js",
    tags: ["react", "nextjs", "typescript"],
    content,
  },
  {
    title: "Markdown Previewer",
    description: "Convert Github flavored markdown into HTML code.",
    tags: ["react", "typescript", "javascript"],
    content,
  },
  {
    title: "URL Shortener",
    description: "A simple URL shortener built with Remix",
    tags: ["remix", "typescript", "javascript", "node"],
    content,
  },
];

export const seed = async () => {
  const password = await argon2.hash("Password123!");

  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const createTags = tags.map((tag) =>
    prisma.tag.create({
      data: {
        name: tag,
      },
    })
  );

  await prisma.$transaction(createTags);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "admin",
      email: "admin@example.com",
      password,
      role: "ADMIN",
      avatar: "https://pbs.twimg.com/profile_images/1498042411444051975/JLTc5ngd_400x400.jpg",
    },
  });

  const createProjects = projects.map((project) =>
    prisma.project.create({
      data: {
        title: project.title,
        slug: slugify(project.title, { lower: true, replacement: "-" }),
        description: project.description,
        content: project.content,
        tags: {
          connect: project.tags.map((tag) => ({ name: tag })),
        },
        user: {
          connect: {
            id: admin.id,
          },
        },
      },
    })
  );

  await prisma.$transaction(createProjects);
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
