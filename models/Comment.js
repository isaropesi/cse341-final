const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true,
        maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        // Not required if we want comments on Projects too, but good for now
        required: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true // Adds updatedAt automatically
});

// Virtual populate for author name if needed
commentSchema.virtual('author', {
    ref: 'User',
    localField: 'authorId',
    foreignField: '_id',
    justOne: true
});

module.exports = mongoose.model('Comment', commentSchema);
