import {createUser, deleteUser} from "../dao/users";
import passport from 'passport';


export async function  createAccount(req,res, next){
    await createUser(req.body)
        res.status(200).json('success')
}

export async function  deleteAccount(req,res, next){
        await deleteUser(req.user.id)
        res.status(200).json('success')
}


export async  function login(req, res, next)  {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const userData = req.user
            delete userData.password
            return res.status(200).json({ message: 'Login successful', user: userData });
        });
    })(req, res, next);
}


export async  function autorizeCookie(req, res, next)  {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Login successful', user: req.user });
        });
    })(req, res, next);
}

export function logout(req, res,next) {
        req.logout(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({message: "Logged out"})
        })
}


export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).json({ message: 'Error, user is not authorized' });
    }
}

export function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        const user = req.user
        delete user.password
        res.status(200).json(user)
    } else {
        res.status(401).json({ message: 'You need to login first' });
    }
}













