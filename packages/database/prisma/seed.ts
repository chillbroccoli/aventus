import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const tags = [
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

  await prisma.user.upsert({
    where: {
      email: "admin@example.com",
    },
    update: {},
    create: {
      name: "admin",
      email: "admin@example.com",
      password:
        "$argon2i$v=19$m=16,t=2,p=1$QjVPd25hZ3VBWVVENktMMg$Lyuxbq0Qa3c0H1t+RGtM2A",
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
