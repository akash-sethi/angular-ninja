import _ from 'lodash'

export const parseErrors = (errors) => {
    const error = {};
    _.forEach(errors, (value, key) => {
        error[key] = value.message;
    });
    return error
};
