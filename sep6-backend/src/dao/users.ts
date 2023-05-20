import { PrismaClient } from "@prisma/client";
import {Bcrypt} from "bcrypt"

const prisma = new PrismaClient();

export async function createUser(req, res, next){

    const userData = req.body
    await prisma.users.create({data:userData})
}


export async function deleteUser(req, res, next){

    const userData = req.body

    await prisma.users.delete({
        where: {
            id : userData.id
        }
    },
)}
