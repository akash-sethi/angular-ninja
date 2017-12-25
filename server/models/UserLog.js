import mongoose from 'mongoose';
import User from './User';

const UserLogSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.ObjectId, ref: User},
  attempt: {type: Number, default: 0},
  logTime: {type: Date, default: Date.now}
});

UserLogSchema.methods.resetAttempt = function resetAttempt() {
  this.attempt = 0;
};

module.exports = mongoose.model('UserLog', UserLogSchema);
