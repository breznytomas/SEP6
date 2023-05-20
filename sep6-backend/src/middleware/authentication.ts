import {getMovies} from "../dao/movies";


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


passport.use(new LocalStrategy({
    usernameField: 'email', // this tells Passport.js to look for 'email' instead of 'username'
    passwordField: 'password' // this is optional in your case as 'password' is the default
    },
    async function(email, password, done) {
        const user = await prisma.users.findUnique({ where: { email: email } });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if ( password != user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
    const user = await prisma.users.findUnique({ where: { id: id } });
    done(null, user);
});


module .exports= passport;