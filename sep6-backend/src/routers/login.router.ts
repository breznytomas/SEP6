import express from "express";
import {createAccount, deleteAccount, ensureAuthenticated, login, logout} from "../controllers/login.controller";
import {handleErrorAsync} from "../middleware/errorHandling"

const createLoginRouter = (): express.Router => {
    const router = express.Router()

    router.post('/signup', handleErrorAsync(createAccount) )
    router.delete('/', ensureAuthenticated, handleErrorAsync(deleteAccount))
    router.post('/login',handleErrorAsync(login))
    router.get('/logout',handleErrorAsync(logout))
    return router
}
export default createLoginRouter()

