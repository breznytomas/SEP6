import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { testRouter } from './routers/testRouter';

const app = express();

// midleware 
app.use(cors({
    credentials: true,
}));

//packages for api response, authentication etc
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

//endpoints
app.use("/test", testRouter)


//create and start server
const server = http.createServer(app);
server.listen(4200, () => console.log('server running on http://localhost:4200/'));
console.log('dsadasd');