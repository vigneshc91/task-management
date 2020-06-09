import Joi from '@hapi/joi';
import { Status } from '../models/task.model';

export default Joi.object({
    status: Joi.number().valid(Status.NEW, Status.INPROGRESS, Status.COMPLETED).required()
}).options({
    abortEarly: false
});
