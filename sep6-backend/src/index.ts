import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import routers from './routers/routers';




const session = require('express-session');
const passport = require('./middleware/authentication');

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
const port = process.env.PORT || 1337;

app.use(session({ secret: 'Kuuuraw jebane', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


server.listen(port, () => console.log('server running'));

app.use('/api/', routers());


