import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function getDetailsPerson(personId) {

  return prisma.people.findUnique({
            where:{
                id: parseInt(personId)
            },

        include:{
                directors:{
                    include:{
                        movies:true
                    }
                },
            stars:{
                    include:{
                        movies:true
                    }
            }
        },


    });


}