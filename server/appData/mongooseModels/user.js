import mongoose from 'mongoose';

const USER = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  email: String,
  // this needs to be encrypted soon
  password: { type: String, required: true },
  age: Number,
  // can also be a Date type
  createdAt: Number,
  // can also be a Date type
  updated_at: Number,
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }]
  // need to add likes
}));

export default USER;
