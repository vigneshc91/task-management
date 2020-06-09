import Joi from '@hapi/joi';
import { Priority, Type, Label } from '../models/task.model';

export default Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(''),
    dueDate: Joi.date().iso().greater('now').optional().allow(''),
    label: Joi.array().items(Joi.number().valid(...Object.values(Label))),
    priority: Joi.number().valid(...Object.values(Priority)).optional().allow(''),
    type: Joi.number().valid(...Object.values(Type)).optional().allow('')
}).options({
    abortEarly: false
});
