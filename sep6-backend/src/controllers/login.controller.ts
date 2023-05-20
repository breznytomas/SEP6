import {createUser, deleteUser} from "../dao/users";
import passport from 'passport';


export async function  createAccount(req,res, next){
    try {
          await createUser(req, res, next)
        res.status(200).json('success')
    } catch (error) {
        next(error);
    }
}

export async function  deleteAccount(req,res, next){
    try {
        await deleteUser(req, res, next)
        res.status(200).json('success')
    } catch (error) {
        next(error);
    }
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
            return res.status(200).json({ message: 'Login successful', user: req.user });
        });
    })(req, res, next);
}

export function logout(req, res,next) {
    try {
        req.logout(function(err) {
            if (err) {
                return next(err);
            }
            res.status(200).json({message: "Logged out"})

        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).json({ message: 'Errro, user is not authorized' });
    }
}







