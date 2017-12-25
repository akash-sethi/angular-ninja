import User from '../models/User'
import {parseErrors} from "../utils/errorParser";

module.exports = {
    auth: (credential, callback) => {
        User.findOne({email: credential.email}).then(user => {
            if (!user || !user.isValidPassword(credential.password)) {
                return callback({errors: {global: 'no user found'}}, null)
            }
            return callback(null, user)
        });
    },

    signup: (credentials, callback) => {
        let user = new User({email: credentials.email});
        user.setPassword(credentials.password);
        user.save()
            .then(user => callback(null, user))
            .catch(err => callback(parseErrors(err.errors), null))
    },
};
