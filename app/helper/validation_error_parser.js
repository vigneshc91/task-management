import _ from 'lodash'
import Httpstatus from 'http-status-codes'

/**
 * Parse the validation error object and modify the response
 * @param {object} obj
 */
export function parse(error) {
    error.output.statusCode = Httpstatus.UNPROCESSABLE_ENTITY
    error.output.payload = { errors: getErrorObject(error) }
    return error
}

/**
 * Return the modified error object
 * @param {object} error
 */
function getErrorObject(error) {
    let errorObject = {}
    if (error.details && error.details.length) {
        error.details.forEach((element) => {
            if (!_.has(errorObject, element.path)) {
                _.set(errorObject, element.path, element.message)
            }
        })
    }
    return errorObject
}
