import mongoose from 'mongoose';

const STORY = mongoose.model('Story', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  category: String,
  summary: String,
  content: String,
  timestamp: Number,
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}));

export default STORY;
