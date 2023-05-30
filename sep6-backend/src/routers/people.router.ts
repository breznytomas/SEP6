import express from "express";
import {getPersonDetails} from "../controllers/people.controller";
import {handleErrorAsync} from "../middleware/errorHandling";


const createPeopleRouter = (): express.Router => {
    const router = express.Router()



    router.get('/:personId' , handleErrorAsync(getPersonDetails));




    return router
}
export default createPeopleRouter()