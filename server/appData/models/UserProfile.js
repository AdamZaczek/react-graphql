import mongoose from 'mongoose';

const UserProfile = mongoose.model('UserProfile', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, sparse: true },
  picture: { type: String },
}));

export default UserProfile;
