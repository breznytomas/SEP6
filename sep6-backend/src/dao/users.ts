import { PrismaClient } from "@prisma/client";
import {Bcrypt} from "bcrypt"

const prisma = new PrismaClient();

export async function createUser(req, res, next){

    const userData = req.body
    await prisma.users.create({data:userData})
}


export async function deleteUser(req, res, next) {

    try {
        const id = req.user.id

        await prisma.users.delete({
            where: {
                id: id
            }
        })
    }
    catch (error){
        next(error)
    }

}
