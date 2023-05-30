import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const prisma = new PrismaClient();

export async function createUser(userData){
    userData.password = await bcrypt.hash(userData.password,10)
    await prisma.users.create({data:userData})
}


export async function deleteUser(id) {
        await prisma.users.delete({
            where: {
                id: id
            }
        })
}
