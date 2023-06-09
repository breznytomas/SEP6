import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers/routers';
import {errorHandler} from "./middleware/errorHandling";


const session = require('express-session');
const passport = require('./middleware/authentication');

const app = express();


app.use(errorHandler)


// midleware
app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'https://localhost:4200',
      'https://sep6-movies-portal.azurewebsites.net',
    ],

    credentials: true,
  })
);

//packages for api response, authentication etc
app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

//create and start server
const server = http.createServer(app);
const port = process.env.PORT || 1337;

app.set('trust proxy', 1);

app.use(
  session({
    secret: 'Kuuuraw jebane',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, sameSite: 'none' },
  })
);
app.use(passport.initialize());
app.use(passport.session());


server.listen(port, () => console.log('server running'));

app.use('/api/', routers());


