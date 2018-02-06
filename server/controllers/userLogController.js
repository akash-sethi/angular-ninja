import UserLog from '../models/UserLog';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import {parseErrors} from "../utils/errorParser";

module.exports = {
  /**
   * This method check the data by comparing with config value if matches success message return and on three failed attempt force logout user.
   * @param token
   * @param data
   * @param callback
   * @returns {*}
   */
  checkAndLog: (token, data, callback) => {
    const SECRET = process.env.secretNumber;
    if (!token) return callback({errors: {global: 'TOKEN-EXPIRED'}}, null);

    jwt.verify(token, process.env.SECRET_KEY, function (err, user) {
      if (err) return callback({errors: {global: 'TOKEN-EXPIRED'}}, null);

      User.findOne({email: user.email}, (err, user) => {
        if (err) return callback(parseErrors(err.errors), null);
        if (data !== parseInt(SECRET)) {
          let userLog;
          UserLog.findOne({user: user}, (err, userLogInstance) => {
            if (userLogInstance) {
              userLog = userLogInstance;
              userLog.attempt = userLogInstance.attempt + 1;
              userLog.logTime = Date.now();
            } else {
              userLog = new UserLog({user: user, attempt: 1});
            }
            let response = {
              statusCode: 200,
              status: 'failure',
              errors: {
                message: `After ${parseInt(process.env.retry) - userLog.attempt}, you will be logged out of the app.`,
              }
            };
            if (userLog.attempt === parseInt(process.env.retry)) {
              response = {statusCode: 401, status: 'failure', errors: {message: 'Max attempt exhausted.'}};
              userLog.attempt = 0;
            }
            userLog.save()
              .then(obj => {
                response.errors.logTime = obj.logTime;
                callback(null, response);
              });
          });
        } else {
          UserLog.findOne({user: user}, (err, userLogInstance) => {
            if (!userLogInstance) {
              return callback(null, {statusCode: 200, status: 'success', message: 'You are the true Hacker!!'})
            }
            if (userLogInstance) {
              userLogInstance.resetAttempt();
              userLogInstance.save()
                .then(userLogInstance => callback(null, {statusCode: 200, status: 'success', message: 'You are the true Hacker!!'}));
            }
          })
        }
      });
    });
  }
};
