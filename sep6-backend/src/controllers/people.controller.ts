import {getDetailsPerson} from "../dao/people";


export async function  getPersonDetails(req,res, next){

        const personId = req.params.personId

        const person = await getDetailsPerson(personId);
        res.status(200).json(person);

}