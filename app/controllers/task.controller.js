import { ResponseHandler } from '../helper/response_handler';
import Httpstatus from 'http-status-codes';
import { TaskService } from '../services/task.service';

export class TaskController {

    /**
     * Create a new task
     * @param {object} request 
     * @param {object} response 
     */
    static async createTask(request, response) {
        try {
            const data = await TaskService.createTask(request.payload, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    } 

    /**
     * Get the list of task
     * @param {object} request 
     * @param {object} response 
     */
    static async listTask(request, response) {
        try {
            const data = await TaskService.listTask(request.query, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Get the task
     * @param {object} request 
     * @param {object} response 
     */
    static async getTask(request, response) {
        try {
            const data = await TaskService.getTaskById(request.params.id, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Update the task
     * @param {object} request 
     * @param {object} response 
     */
    static async updateTask(request, response) {
        try {
            const data = await TaskService.updateTask(request.payload, request.params.id, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Delete the task
     * @param {object} request 
     * @param {object} response 
     */
    static async deleteTask(request, response) {
        try {
            const data = await TaskService.deleteTask(request.params.id, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * Change task status
     * @param {object} request 
     * @param {object} response 
     */
    static async changeTaskStatus(request, response) {
        try {
            const data = await TaskService.changeTaskStatus(request.payload, request.params.id, request.auth.credentials.subject);
            
            return ResponseHandler.handle(response, data);
        } catch (error) {
            return ResponseHandler.handle(response, {
                success: 0,
                errors: error,
                exception: exception,
                statusCode: Httpstatus.INTERNAL_SERVER_ERROR
            });
        }
    }

}