const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc    Auth with GitHub
// @route   GET /auth/github
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// @desc    GitHub auth callback
// @route   GET /auth/github/callback
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to API Docs or Frontend
        res.redirect('/api-docs');
    }
);

// @desc    Logout user
// @route   GET /auth/logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;
