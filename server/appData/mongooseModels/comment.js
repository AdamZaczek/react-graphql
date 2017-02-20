import mongoose from 'mongoose';

const COMMENT = mongoose.model('Comment', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  _author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  _story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
  summary: String,
  content: { type: String, required: true, max: 200 },
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  // for a moment there will be no threading
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}));

export default COMMENT;
