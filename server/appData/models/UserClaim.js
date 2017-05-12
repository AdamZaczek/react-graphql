import mongoose from 'mongoose';

const UserClaim = mongoose.model('UserClaim', ({
  type: { type: String },
  value: { type: String },
}));

export default UserClaim;
