import mongoose from 'mongoose';

const COMMENT = mongoose.model('Story', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  category: { type: String, required: true },
  summary: String,
  content: { String, required: true },
  timestamp: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  // for a moment there will be no threading
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}));

export default COMMENT;
