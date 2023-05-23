import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async  function getMovies() {
    const movies = await prisma.movies.findMany({

        where: {
            year: {
                gte: 1980,
                lte: 2020
            },
        },

        take: 100,
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

    const moviesWithsubfields = movies.filter(
        movie => movie.directors.length >0
    && movie.stars.length >0);

    return moviesWithsubfields
}


    export async function getMovieDirectorOrActor(searchTerm) {

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

    export async function getMovieDetails(movieId) {

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


