import { TaskController } from '../controllers/task.controller';
import { parse } from '../helper/validation_error_parser';
import createTaskValidator from '../validators/create_task.validator';
import updateTaskValidator from '../validators/update_task.validator';
import listTaskValidator from '../validators/list_task.validator';
import changeTaskStatusValidator from '../validators/change_task_status.validator';
import Joi from '@hapi/joi';

export function taskRoute(server) {

    server.route({
        method: 'POST',
        path: '/api/tasks',
        options: {
            tags: ['api', 'Task'],
            description: 'Create a new task with the given info',
            notes: 'Task Create',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                payload: createTaskValidator,
                failAction: (request, response, err) => {
                    throw parse(err);
                }
            }
        },
        handler: TaskController.createTask
    });

    server.route({
        method: 'PUT',
        path: '/api/tasks/{id}',
        options: {
            tags: ['api', 'Task'],
            description: 'Update the details of the task with the given info',
            notes: 'Task Update',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: updateTaskValidator,
                failAction: (request, response, err) => {
                    throw parse(err);
                }
            }
        },
        handler: TaskController.updateTask
    })
    
    server.route({
        method: 'GET',
        path: '/api/tasks',
        options: {
            tags: ['api', 'Task'],
            description: 'Get the list of tasks created by the user',
            notes: 'Task List',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                query: listTaskValidator,
                failAction: (request, response, err) => {
                    throw parse(err);
                }
            }
        },
        handler: TaskController.listTask
    });

    server.route({
        method: 'GET',
        path: '/api/tasks/{id}',
        options: {
            tags: ['api', 'Task'],
            description: 'Get details of the task',
            notes: 'Task Get',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
        handler: TaskController.getTask
    });

    server.route({
        method: 'DELETE',
        path: '/api/tasks/{id}',
        options: {
            tags: ['api', 'Task'],
            description: 'Delete the given task',
            notes: 'Task Delete',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                })
            }
        },
        handler: TaskController.deleteTask
    });

    server.route({
        method: 'PATCH',
        path: '/api/tasks/{id}',
        options: {
            tags: ['api', 'Task'],
            description: 'Change the status of the given task',
            notes: 'Task Status Change',
            plugins: {
                'hapi-swagger': {
                    security: [{ apiKey: [] }]
                }
            },
            validate: {
                params: Joi.object({
                    id: Joi.string().required()
                }),
                payload: changeTaskStatusValidator,
                failAction: (request, response, err) => {
                    throw parse(err);
                }
            }
        },
        handler: TaskController.changeTaskStatus
    });

}