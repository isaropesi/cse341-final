const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: process.env.GITHUB_CALLBACK_URL || '/auth/github/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    githubId: profile.id,
                    displayName: profile.displayName || profile.username,
                    username: profile.username,
                    image: profile.photos && profile.photos[0] ? profile.photos[0].value : ''
                };

                try {
                    let user = await User.findOne({ githubId: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, user);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};
