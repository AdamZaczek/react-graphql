import mongoose from 'mongoose';

const UserProfile = mongoose.model('UserProfile', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, sparse: true },
  //email: { type: String, required: true, unique: true },
  picture: { type: String },
  isAdmin: { Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updated_at: Date,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  storyLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  storyDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  commentDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}));

export default UserProfile;
