import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getDetailsPerson(personId) {
       const personWithDetials = await prisma.people.findUnique({
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

       return personWithDetials
}