const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  user_type: String
});
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  console.log('before saving user');
  next();
});
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({_id: user._id.toString()}, process.env.SECRET);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};
userSchema.methods.comparePassword = function (password,next) {
  const user = this;
  return bcrypt.compareSync(password,user.password)
};
module.exports = mongoose.model('User', userSchema)
