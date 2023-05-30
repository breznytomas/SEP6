import express from "express";
import {
    checkAuth,
    createAccount,
    deleteAccount,
    ensureAuthenticated,
    login,
    logout
} from "../controllers/login.controller";
import {handleErrorAsync} from "../middleware/errorHandling"

const createLoginRouter = (): express.Router => {
    const router = express.Router()

    router.post('/signup', handleErrorAsync(createAccount) )
    router.delete('/', ensureAuthenticated, handleErrorAsync(deleteAccount))
    router.post('/login',handleErrorAsync(login))
    router.get('/logout',logout)
    router.get('/checkAuth',handleErrorAsync(checkAuth))
    return router
}
export default createLoginRouter()

