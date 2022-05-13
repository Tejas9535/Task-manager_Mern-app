import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        minlength: 6,
    },
    completed: {
        type: Boolean,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Task = mongoose.model('task', schema);

export default Task;