import _ from 'lodash'

/**
 * This method is used to parse errors that thrown by failed mongoose operation.
 * @param errors
 * @returns errorObject
 */
export const parseErrors = (errors) => {
    const error = {};
    _.forEach(errors, (value, key) => {
        error[key] = value.message;
    });
    return error
};
