import mongoose from 'mongoose';


// for now there are no avatars
const USER = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  // this needs to be encrypted soon
  password: { type: String, required: true },
  age: Number,
  // can also be a Date type
  createdAt: { type: Date, default: Date.now },
  // can also be a Date type
  updated_at: Date,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  storyLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  storyDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  commentLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  commentDislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  // need to add likes
}));

export default USER;
