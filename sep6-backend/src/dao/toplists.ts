import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export async function getToplistByUser(req, res, next) {

    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.user.id
            }
        });

        // If the user doesn't exist, send an error response
        if (!user) {
            return res.status(404).send('User not found');
        }

        //have user id

        // Fetch the toplists for the user

        const toplists = await prisma.toplists.findMany({
            where: {
                user_id: user.id
            },
            include: {
                movies:true
            }

        });
        return toplists;
    }
    catch (error){
        next(error)
    }


}

export async  function addToplist(req, res, next){
    const { name, description } = req.body;
    const user_id = req.user.id
    try {
        const newToplist = await prisma.toplists.create({
            data: {
                user_id,
                name,
                description,
            },
        });

       return newToplist;
    } catch (error) {
            next(error)
    }
}

export async function addMovieIntoToplist(req, res, next){
    const {toplistId, movieId} = req.body;


    if (await verifyUserOwnsPlaylist(toplistId, req.user.id)==true) {

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

export async function removeToplist(req, res, next){

    const id = parseInt(req.params.id)



    try {
        if (await verifyUserOwnsPlaylist(id, req.user.id)==true) {

            await prisma.toplists.delete({
                where: {
                    id: id
                }
            })
        }
    }

    catch (error){
        next(error)
    }
}

async function verifyUserOwnsPlaylist(id,userID){

    const smth = await prisma.toplists.findUnique({
        where:{
           id:id
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

export async function deleteMovieFromToplist (req, res, next){
    const {toplistId, movieId} = req.body;

    try {

        if (await verifyUserOwnsPlaylist(toplistId,req.user.id)==true) {

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
     catch (error){
        next(error)
     }
}


export async function getMoviesfromToplists(req, res, next){
    const { toplistId } = req.params;

    try {
        const toplistWithMovies = await prisma.toplists.findUnique({
            where: {
                id: parseInt(toplistId),
            },
            include: {
                movies: true,
            },
        });

       return toplistWithMovies
    } catch (error) {
        next(error);
    }
}






