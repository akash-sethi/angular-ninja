import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index: true, lowercase: true, unique: true},
  hashPassword: {type: String},
  confirmed: {type: Boolean, default: false},
}, {timestamp: true});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.hashPassword)
};

UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
  }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60
  })
};

UserSchema.methods.toAuthJson = function toAuthJson() {
  return {
    token: this.generateJWT()
  }
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
};


module.exports = mongoose.model('User', UserSchema);
