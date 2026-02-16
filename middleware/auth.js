module.exports = {
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status(401).json({
                success: false,
                error: 'Unauthorized: Please log in with GitHub first.'
            });
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/api-docs');
        } else {
            return next();
        }
    }
};
