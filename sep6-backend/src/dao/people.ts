import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getDetailsPerson(personId) {
       const personWithDetails = await prisma.people.findUnique({
           where: {
               id: parseInt(personId)
           },

           include: {
               directors: {
                   include: {
                       movies: {
                           include: {
                               ratings: true
                           }
                       }
                   }
               },
               stars: {
                   include: {
                       movies: {
                           include: {
                               ratings: true
                           }
                       }
                   }
               }

           },

       });


// First off we create an array of all ratings for the movies that the person directed
// It will be in a form of array that has objects, and those object contain the average rating and the weight of the rating (how many votes it has)
// Movies without rating will be excluded
    const directorAverageRating = personWithDetails.directors.flatMap(d =>
        d.movies.ratings.length > 0 ? d.movies.ratings.map(r => ({ rating: r.rating, votes: r.votes })) : []
    );

   //the same process applies here with the only difference being that this is for movies which the person played in
    const actorAverageRating = personWithDetails.stars.flatMap(a =>
        a.movies.ratings.length > 0 ? a.movies.ratings.map(r => ({ rating: r.rating, votes: r.votes })) : []
    );



    // The Weighted average is calculated here
    // We sum products of each rating and its number of votes, divide by total number of votes
    //what we get is the average rating for person in both the director and actor roles, the averages are weighted so it cares about how many votes one rating has

    const directorWeightedAverage = directorAverageRating.reduce((acc, rat) => acc + rat.rating * rat.votes, 0) / directorAverageRating.reduce((acc, rat) => acc + rat.votes, 0);
    const actorWeightedAverage = actorAverageRating.reduce((acc, rat) => acc + rat.rating * rat.votes, 0) / actorAverageRating.reduce((acc, rat) => acc + rat.votes, 0);

    return {
        personWithDetails,
        directorAvgRating: directorWeightedAverage,
        actorAvgRating: actorWeightedAverage
    }


}