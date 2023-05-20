import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient();

export async function getToplistByUser(req, res, next) {

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

        });

    res.status(200).json(toplists)

}

export async function addToplist(req, res, next){
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

        res.status(201).json(newToplist);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}


export async function removeToplist(req, res, next){

}

export async function addMovieToToplist(req, res, next){



   /* await prisma.post.create({
        data: {
            title: 'Types of relations',
            tags: { create: [{ name: 'dev' }, { name: 'prisma' }] },
        },
    })*/


    const { Id: id }  = req.body
    await prisma.toplists.update({
        where: {
            id : id
        },
        data: {

        }
    })
}

export async function getMoviesFromToplist(req, res , ext ){
   /* await prisma.post.create({
        data: {
            title: 'Types of relations',
            tags: { create: [{ name: 'dev' }, { name: 'prisma' }] },
        },
    })*/
}





