import Joi from '@hapi/joi';
import { Priority, Status, Type, Label } from '../models/task.model';

const priority = Joi.number().valid(...Object.values(Priority));
const type = Joi.number().valid(...Object.values(Type));
const label = Joi.number().valid(...Object.values(Label));
const status = Joi.number().valid(Status.NEW, Status.INPROGRESS, Status.COMPLETED);
const sort = ['createdAt', '-createdAt', 'updatedAt', '-updatedAt', 'title', '-title', 'priority', '-priority', 'status', '-status'];

export default Joi.object({
    search: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().optional().allow(''),
    priority: Joi.alternatives().try(Joi.array().items(priority), priority).optional().allow(''),
    type: Joi.alternatives().try(Joi.array().items(type), type).optional().allow(''),
    label: Joi.alternatives().try(Joi.array().items(label), label).optional().allow(''),
    status: Joi.alternatives().try(Joi.array().items(status), status).optional().allow(''),
    sort: Joi.string().valid(...sort).optional().allow(''),
    skip: Joi.number().optional().allow(''),
    size: Joi.number().optional().allow(''),
    all: Joi.bool().optional().allow('')
}).options({
    abortEarly: false,
    stripUnknown: true
});
