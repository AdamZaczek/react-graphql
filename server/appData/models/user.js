import mongoose from 'mongoose';

const USER = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  name: { type: String, sparse: true },
  // this needs to be encrypted soon
  password: { type: String, required: true },
  isAdmin: { Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updated_at: Date,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  storyLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  storyDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  commentDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}));

export default USER;
