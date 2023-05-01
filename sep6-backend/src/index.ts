import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers/routers';

const app = express();

// midleware
app.use(
  cors({
    credentials: true,
  })
);

//packages for api response, authentication etc
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

//create and start server
const server = http.createServer(app);
server.listen(process.env.prort || 4200, () =>
  console.log('server running')
);

app.use('/api/', routers());
