import Joi from '@hapi/joi';
import { Priority } from '../models/task.model';

export default Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().greater('now').optional().allow(''),
    label: Joi.array().items(Joi.string()),
    priority: Joi.number().valid(...Object.values(Priority)).optional().allow('')
}).options({
    abortEarly: false
});
