import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import isEmail from 'validator/lib/isEmail.js'

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter a name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    accessToken: String,
})


userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  const User = mongoose.model('user',userSchema)

export default User