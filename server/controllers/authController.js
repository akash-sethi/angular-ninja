import User from '../models/User'
import {parseErrors} from "../utils/errorParser";

module.exports = {
  /**
   * This method is used to check if user is authenticated.
   * @param credential
   * @param callback
   * @returns token for success or error response for failure.
   */
    auth: (credential, callback) => {
        User.findOne({email: credential.email}).then(user => {
            if (!user || !user.isValidPassword(credential.password)) {
                return callback({errors: {global: 'no user found'}}, null)
            }
            return callback(null, user)
        });
    },

  /**
   * This method is used to signup new user.
   * @param credentials
   * @param callback
   * @returns token for success or error response for failure.
   */
    signup: (credentials, callback) => {
        let user = new User({email: credentials.email});
        user.setPassword(credentials.password);
        user.save()
            .then(user => callback(null, user))
            .catch(err => callback(parseErrors(err.errors), null))
    },
};
