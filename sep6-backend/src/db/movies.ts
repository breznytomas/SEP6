import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMovies = async () =>
  await prisma.movies.findMany({ take: 100 });
