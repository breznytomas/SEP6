import express, {Request, Response} from "express";
const testRouter = express.Router();

testRouter.get("/", async (req: Request, res: Response) => {
    return res.status(200).json('it is working')
  });

export {testRouter};