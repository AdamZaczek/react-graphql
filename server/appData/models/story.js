import mongoose from 'mongoose';

const STORY = mongoose.model('Story', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  summary: String,
  content: { type: String, max: 5000, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}));

export default STORY;
