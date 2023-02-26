import { PrismaClient } from "@prisma/client";
import * as argon2 from "argon2";

import { defaultContent, defaultTags } from "../src/utils/constants";
import { getSlug } from "../src/utils/getSlug";
import { logger } from "../src/utils/logger";

const prisma = new PrismaClient();

const projects = [
  {
    title: "To-Do App",
    description: "A simple to-do app built with React and Next.js",
    tags: ["react", "nextjs", "typescript"],
    content: defaultContent,
  },
  {
    title: "Markdown Previewer",
    description: "Convert Github flavored markdown into HTML code.",
    tags: ["react", "typescript", "javascript"],
    content: defaultContent,
  },
  {
    title: "URL Shortener",
    description: "A simple URL shortener built with Remix",
    tags: ["remix", "typescript", "javascript", "node"],
    content: defaultContent,
  },
];

export const seed = async () => {
  const password = await argon2.hash("Password123!");

  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  const createTags = defaultTags.map((tag) =>
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
        slug: getSlug(project.title),
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
