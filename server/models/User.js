import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uniqueValidator from 'mongoose-unique-validator'

/**
 * This class defines the schema for user.
 * @type {mongoose.Schema}
 */
const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, index: true, lowercase: true, unique: true},
  hashPassword: {type: String},
  confirmed: {type: Boolean, default: false},
}, {timestamp: true});

UserSchema.plugin(uniqueValidator);

/**
 * This method compare the password with the encrypted saved password in database while performing auth.
 * @param password
 * @returns boolean
 */
UserSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.hashPassword)
};

/**
 * This method is used to generate jason web token by taking email and secret key saved in configuration file.
 * @returns string token
 */
UserSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign({
    email: this.email,
  }, process.env.SECRET_KEY, {
    expiresIn: 60 * 60
  })
};

/**
 * This is helper method for creating auth response by generating token for email.
 * @returns {{token: string}}
 */
UserSchema.methods.toAuthJson = function toAuthJson() {
  return {
    token: this.generateJWT()
  }
};

UserSchema.methods.setPassword = function setPassword(password) {
  this.hashPassword = bcrypt.hashSync(password, 10);
};


module.exports = mongoose.model('User', UserSchema);
