import mongoose from "mongoose";

export const Status = {
    NEW: 1,
    INPROGRESS: 2,
    COMPLETED: 3,
    DELETED: 4
}

export const Priority = {
    LOWEST: 1,
    LOW: 2,
    MEDIUM: 3,
    HIGH: 4,
    HIGHEST: 5
}

export const Type = {
    TASK: 1,
    STORY: 2,
    BUG: 3
}

export const Label = {
    FEATURE: 1,
    CHANGE_REQUEST: 2,
    FRONTEND: 3,
    BACKEND: 4,
    WEB: 5,
    MOBILE: 6
}

export const Pagination = {
    SKIP: 0,
    SIZE: 10
}

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    priority: { type: Number, enum: Object.values(Priority) },
    type: { type: Number, enum: Object.values(Type) },
    label: { type: [Number], enum: Object.values(Label) },
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