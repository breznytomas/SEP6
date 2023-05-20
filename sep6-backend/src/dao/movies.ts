import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMovies = async () =>
  await prisma.movies.findMany({ take: 10,
      include: {
          directors: {
              include: {
                  people:true,
              },
          },
          stars: {
              include: {
                  people: true,
              },
          },
      }
  });


export const getMovieByPerson = async () =>
    await prisma.movies.findMany({ take: 10,
        include: {
            directors: {
                include: {
                    people:true,
                },
            },
            stars: {
                include: {
                    people: true,
                },
            },
        }
    });


