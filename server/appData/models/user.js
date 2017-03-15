import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const USER = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  // this needs to be encrypted soon
  password: { type: String, required: true },
  age: { type: Number, min: 1, max: 115 },
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

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
USER.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

/**
 * The pre-save hook method.
 */
USER.pre('save', function saveHook(next) {
  const user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

export default USER;
