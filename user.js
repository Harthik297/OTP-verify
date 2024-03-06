import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  googleId: String,
  email: String,
  role: String // Assuming role is a string, you can adjust as needed
});

const User = model('User', userSchema);

export default User;