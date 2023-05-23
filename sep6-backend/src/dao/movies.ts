import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMovies = async () =>
  await prisma.movies.findMany({

      where:{
          year:{
              gte: 2010,
              lte:  2020
          }
      },

      orderBy: {
          year: 'desc', // sorting movies by year in descending order to get newest movies first
      },
      take: 10,
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
          ratings: true
      }
  });


export async function getMovieDirectorOrActor(searchTerm){

    const movies = await prisma.movies.findMany({
        where: {
            title: {
                contains: searchTerm,
            },
        },
        take: 3,
    });

    const people = await prisma.people.findMany({
        where: {
            name: {
                contains: searchTerm,
            },
        },
        take: 3,
    });

    return {
        movies,
        people,
    };
}

export async function getMovieDetails(movieId){

   return prisma.movies.findUnique({

       where: {
           id: parseInt(movieId)

       },

       include: {
           directors: {
               include: {
                   people: true,
               },
           },
           stars: {
               include: {
                   people: true,
               },
           },
           ratings: true
       }
   });



}


