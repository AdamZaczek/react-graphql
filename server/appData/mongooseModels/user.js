import mongoose from 'mongoose';

const USER = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  // this needs to be encrypted soon
  password: { type: String, required: true },
  age: { type: Number, min: 1, max: 115 },
  isAdmin: { Boolean, default: false },
  createdAt: { type: Date, default: Date.now, max: 5000 },
  updated_at: Date,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  storyLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  storyDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  commentDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}));

export default USER;
