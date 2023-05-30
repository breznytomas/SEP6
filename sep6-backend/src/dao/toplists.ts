import {PrismaClient} from "@prisma/client";
import {parse} from "dotenv";


const prisma = new PrismaClient();

export async function getToplistByUser(userId) {

        const toplists = await prisma.toplists.findMany({
            where: {
                user_id: userId
            },
            include: {
                movies:true
            }

        });
        return toplists;
}

export async  function addToplist(user_id, name, description){

        const newToplist = await prisma.toplists.create({
            data: {
                user_id,
                name,
                description,
            },
        });

       return newToplist;
}

export async function addMovieIntoToplist(toplistId, movieId, userId){
    if (await verifyUserOwnsPlaylist(toplistId, userId)==true) {

        const updatedToplist = await prisma.toplists.update({
            where: {id: parseInt(toplistId)},
            data: {
                movies: {
                    connect: {id: parseInt(movieId)},
                },
            },
        })
        return updatedToplist
    }
}

export async function removeToplist(userid, toplistId){

        if (await verifyUserOwnsPlaylist(toplistId, userid)==true) {

            await prisma.toplists.delete({
                where: {
                    id: toplistId
                }
            })
        }

}

async function verifyUserOwnsPlaylist(id,userID){

    const smth = await prisma.toplists.findUnique({
        where:{
           id:parseInt(id)
        },
        include:{
            users:true
        }
    })

    if (smth.user_id==userID){
        return true
    }
    else{
        return false
    }
}

export async function deleteMovieFromToplist (toplistId, userId, movieId){

        if (await verifyUserOwnsPlaylist(toplistId,userId)==true) {

            await prisma.toplists.update({
                where: {id: parseInt(toplistId)},
                data: {
                    movies: {
                        disconnect: {id: parseInt(movieId)},
                    },
                },
            })
        }
}






