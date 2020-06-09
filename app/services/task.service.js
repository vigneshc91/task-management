import HttpStatus from 'http-status-codes';
import { TaskModel, Status, Pagination } from '../models/task.model';
import * as FailureConstants from '../helper/failure_constants';
import moment from 'moment';

export class TaskService {
    
    /**
     * Create a new task under the user
     * @param {object} data 
     * @param {string} user 
     */
    static async createTask(data, user) {
        try {
            data.user = user;
            
            const task = await TaskModel.create(data);
            
            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.CREATED
            };

        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Get the list of task
     * @param {object} data 
     * @param {string} user 
     */
    static async listTask(data, user) {
        try {
            let conditions = {
                user: user,
                status: { $ne: Status.DELETED }
            };

            if (data.status) {
                if (data.status instanceof Array) {
                    conditions.status = { $in: data.status };
                } else {
                    conditions.status = data.status;
                }
            } else {
                conditions.status = { $ne: Status.DELETED };
            }

            if (data.priority) {
                if (data.label instanceof Array) {
                    conditions.priority = { $in: data.priority };
                } else {
                    conditions.priority = data.priority;
                }
            }

            if (data.search) {
                conditions.$or = [
                    { title: { $regex: data.search, $options: 'i'} },
                    { description: { $regex: data.search, $options: 'i'} }
                ]
            }

            if (data.dueDate) {
                conditions.dueDate = { $gt: moment(data.dueDate).startOf('day'), $lt: moment(data.dueDate).endOf('day') };
            }

            let task = TaskModel.find(conditions);

            if (!data.all) {
                task.skip(data.skip || Pagination.SKIP).limit(data.size || Pagination.SIZE);
            }

            if (data.sort) {
                task.sort(data.sort)
            } else {
                task.sort('-createdAt');
            }

            task = await task.exec();

            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Get the details of the task
     * @param {string} id 
     * @param {string} user 
     */
    static async getTaskById(id, user) {
        try {
            let conditions = {
                _id: id,
                status: { $ne: Status.DELETED }
            };

            if (user) {
                conditions.user = user;
            }

            const task = await TaskModel.findOne(conditions);

            if (!task) {
                return {
                    success: 0,
                    errors: FailureConstants.TASK_NOT_FOUND,
                    statusCode: HttpStatus.NOT_FOUND
                };
            }

            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Delete the task
     * @param {string} id 
     * @param {string} user 
     */
    static async deleteTask(id, user) {
        try {
            let task = await this.getTaskById(id, user);
            if (!task.success) {
                return task;
            }
            task = task.data;

            task.status = Status.DELETED;
            await task.save();

            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.NO_CONTENT
            };

        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Update the details of the task
     * @param {object} data 
     * @param {string} id 
     * @param {string} user 
     */
    static async updateTask(data, id, user) {
        try {
            let task = await this.getTaskById(id, user);
            if (!task.success) {
                return task;
            }
            task = task.data;

            for (const key of Object.keys(data)) {
                task[key] = data[key];
            }

            await task.save();

            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    /**
     * Change the status of the task
     * @param {object} data 
     * @param {string} id 
     * @param {string} user 
     */
    static async changeTaskStatus(data, id, user) {
        try {

            let task = await this.getTaskById(id, user);
            if (!task.success) {
                return task;
            }
            task = task.data;

            task.status = data.status;
            await task.save();

            return {
                success: 1,
                data: task,
                statusCode: HttpStatus.OK
            };
            
        } catch (error) {
            return {
                success: 0,
                errors: error,
                exception: error,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

}