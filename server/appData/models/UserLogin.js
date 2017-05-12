import mongoose from 'mongoose';

const UserLogin = mongoose.model('UserLogin', ({
  name: { type: String, primaryKey: true},
  key: { type: String },
}));

export default UserLogin;
