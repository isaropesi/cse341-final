const User = require('../models/User');

// @desc    Get all users
// @route   GET /users
// @access  Public
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single user
// @route   GET /users/:id
// @access  Public
exports.getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a user (Manual)
// @route   POST /users
// @access  Public (for testing/full CRUD requirement)
exports.createUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a user
// @route   PUT /users/:id
// @access  Private (Self only)
exports.updateUser = async (req, res, next) => {
    try {
        // Only allow updating own profile
        if (req.params.id !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to update this profile' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a user
// @route   DELETE /users/:id
// @access  Private (Self only)
exports.deleteUser = async (req, res, next) => {
    try {
        // Only allow deleting own profile
        if (req.params.id !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to delete this profile' });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted'
        });
    } catch (error) {
        next(error);
    }
};

