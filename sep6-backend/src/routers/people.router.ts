import express from "express";
import {getPersonDetails} from "../controllers/people.controller";


const createPeopleRouter = (): express.Router => {
    const router = express.Router()



    router.get('/:personId' , getPersonDetails);









    return router
}
export default createPeopleRouter()