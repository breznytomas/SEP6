import express from "express";
import {createAccount, deleteAccount, ensureAuthenticated, login, logout} from "../controllers/login.controller";


const createLoginRouter = (): express.Router => {
    const router = express.Router()


    router.post('/signup',createAccount )

    router.delete('/', ensureAuthenticated, deleteAccount)

    router.post('/login',login)

    router.get('/logout',logout)

    return router
}
export default createLoginRouter()
