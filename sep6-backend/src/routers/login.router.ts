import express from "express";

export default (router: express.Router) => {

//login
    router.post('/login', )

// Logout route
    router.post('/logout', (req, res) => {
        // Here you would typically handle the logout logic
        // Destroy the session, invalidate the token, etc.

        // Assuming a successful logout, send a response indicating success
        res.json({ message: 'Logout successful' });
    });


}