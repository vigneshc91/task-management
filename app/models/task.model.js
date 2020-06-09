import mongoose from "mongoose";

export const Status = {
    NEW: 1,
    INPROGRESS: 2,
    COMPLETED: 3,
    DELETED: 4
}

export const Priority = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3
}

export const Pagination = {
    SKIP: 0,
    SIZE: 10
}

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: { type: Number, enum: Object.values(Priority) },
    label: [String],
    dueDate: Date,
    user: { type: 'ObjectId', ref: 'User' },
    status: { type: Number, enum: Object.values(Status), default: Status.NEW }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

export const TaskModel = mongoose.model('Task', TaskSchema);