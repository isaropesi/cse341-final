const Comment = require('../models/Comment');

// @desc    Get comments for a task
// @route   GET /comments/task/:taskId
// @access  Public
exports.getCommentsByTask = async (req, res, next) => {
    try {
        const comments = await Comment.find({ taskId: req.params.taskId })
            .populate('authorId', 'displayName image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: comments.length,
            data: comments
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add a comment
// @route   POST /comments
// @access  Private
exports.addComment = async (req, res, next) => {
    try {
        // If user is logged in, attach their ID
        if (req.user) {
            req.body.authorId = req.user.id;
        } else {
            // Ideally this route is protected, so this block won't hit if ensureAuth works
            // But for robustness:
            return res.status(401).json({ success: false, error: 'User must be logged in' });
        }

        const comment = await Comment.create(req.body);

        // Populate author info for immediate UI update
        await comment.populate('authorId', 'displayName image');

        res.status(201).json({
            success: true,
            data: comment
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a comment
// @route   DELETE /comments/:id
// @access  Private (Owner only)
exports.deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ success: false, error: 'Comment not found' });
        }

        // Check ownership
        // Convert ObjectIds to string for comparison
        if (comment.authorId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to delete this comment' });
        }

        await comment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Comment deleted'
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a comment
// @route   PUT /comments/:id
// @access  Private (Owner only)
exports.updateComment = async (req, res, next) => {
    try {
        let comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ success: false, error: 'Comment not found' });
        }

        // Check ownership
        if (comment.authorId.toString() !== req.user.id) {
            return res.status(403).json({ success: false, error: 'Not authorized to update this comment' });
        }

        comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: comment
        });
    } catch (error) {
        next(error);
    }
};

