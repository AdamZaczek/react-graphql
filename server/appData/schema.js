/* eslint-disable no-unused-vars, no-use-before-define */
/* eslint-disable */
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLInterfaceType
} from 'graphql';
import mongoose from 'mongoose';

// required: true causes an error for now, gotta fix that
import STORY from './mongooseModels/story';
import USER from './mongooseModels/user';
import COMMENT from './mongooseModels/comment';

//not sure if thats the way it should be done, leaving to for a moment
// const RATING = new Schema({
//   _user: { type: ObjectId, ref: 'User' },
//   _ratedItem: { type: ObjectId, ref: 'Story' },
//   value: Number
// })

const getPrettyDate = (date) => {
  return ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth()+1)).slice(-2) + '/'
            + date.getFullYear();
};

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'Represents a category of a story',
  values: {
    ADULT: { value: 'adult life' },
    SEX: { value: 'sex' },
    LOVE: { value: 'love' },
    SCHOOL: { value: 'school' },
    FUNNY: { value: 'funny' },
    DATE: { value: 'date' },
    SAD: { value: 'sad' },
    EMBARRASSING: { value: 'embarrassing' },
    SCARY: { value: 'scary' }
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represents user of the application',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    age: { type: GraphQLInt },
    createdAt: { type: GraphQLInt },
    updatedAt: { type: GraphQLInt },
//  stories field needs testing
    stories: {
      type: new GraphQLList(Story),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning stories'}
      },
      // first argument is the context, in this case the certain User object, we named it user
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.stories.map((story) => {
          return STORY.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
    // todo: test, mock storyLikes
    storyLikes: {
      type: new GraphQLList(Story),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning likes stories'}
      },
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.storyLikes.map((story) => {
          return STORY.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
    // todo: test, mock
    storyDislikes: {
      type: new GraphQLList(Story),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning disliked stories'}
      },
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.storyDislikes.map((story) => {
          return STORY.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
    // todo: test, mock
    commentLikes: {
      type: new GraphQLList(Comment),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning liked comments'}
      },
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.commentLikes.map((comment) => {
          return COMMENT.findOne({ _id: comment }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
    // todo: test, mock
    commentDislikes: {
      type: new GraphQLList(Comment),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning disliked comments'}
      },
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.commentDislikes.map((story) => {
          return COMMENT.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
  })
});

const Comment = new GraphQLObjectType({
  name: 'Comment',
  decription: 'Represents story\'s comment',
  fields: () => ({
    _id: { type: GraphQLString },
    _author: {
      type: User,
      resolve: (Comment) => {
        return USER.findOne({ _id: Comment._author})
      }
    },
    _story: {
      type: Story,
      resolve: (Comment) => {
        return STORY.findOne({ _id: Story._story})
      }
    },
    summary: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLInt },
    // need likes and dislikes
  })
});

const Story = new GraphQLObjectType({
  name: 'Story',
  description: 'Represent the type of a story',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: Category },
    summary: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (story) => {
        if (story.createdAt) {
          let creationDate = new Date(story.createdAt)
          let formattedDate = getPrettyDate(creationDate)
          return formattedDate
        }
        return null;
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      args: {
        limit: {type: GraphQLInt, description: 'Limit the returning comments'}
      },
      resolve: (story, { limit }) => {
        let commAry = [];
        commAry = story.comments.map((comment) => {
          return COMMENT.findOne({ _id: comment }, (err, res) => {
            if (err) return err;
            return res
          })
        })
        if (limit >= 0) {
          return commAry.slice(0, limit);
        }
        return commAry;
      }
    },
    _author: {
      type: User,
      resolve: (Story) => {
        return USER.findOne({ _id: Story._author })
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'NobodysStoriesSchema',
  description: 'Root of the Nobodys Stories',
  fields: () => ({
    customStoriesQuery: {
      type: new GraphQLList(Story),
      description: 'List of stories in the Nobodys Stories',
      args: {
        category: { type: Category }
      },
      resolve: (source, { category }) => {
        if (category) {
          return STORY.find({ category }, (err, res) => {
            if (err) return err;
            return res;
          });
        }
        return STORY.find({}, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    },
    customStoryQuery: {
      type: Story,
      description: 'Story by _id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, { id }) {
        return STORY.findById(id, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    },
    customLatestStoryQuery: {
      type: Story,
      description: 'Latest story in the Nobodys Stories',
      resolve: (source) => {
        return STORY.findOne({}).sort('-date').exec((err, docs) => {
          if (err) return err;
          return docs;
        });
      },
    },
    customRecentStoriesQuery: {
      type: new GraphQLList(Story),
      description: 'Recent story in the Nobodys Stories',
      args: {
        count: { type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent stories' }
      },
      resolve: (source, { count }) => {
        return STORY.find({}).sort('-date').limit(count).exec((err, docs) => {
          if (err) return err;
          return docs
        });
      },
    },
    customUsersQuery: {
      type: new GraphQLList(User),
      description: 'Available users in the Nobodys Stories',
      resolve() {
        return USER.find({}, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    },
    customUserQuery: {
      type: User,
      description: 'User by _id',
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, { id }) {
        return USER.findById(id, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    }
  })
});

const Mutation = new GraphQLObjectType({
  name: 'NobodysStoriesMutations',
  fields: {
    createStory: {
      type: Story,
      description: 'Create a new story',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        summary: { type: GraphQLString },
        category: { type: Category },
        auser: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the user' }
      },
      resolve(source, { ...args }) {
        const story = args;
//        const alreadyExists = _.findIndex(StoriesList, p => p._id === story._id) >= 0;

        // this looks like a working code, awesome!
        const lookForExistingId = singleStory => singleStory._id === story._id;
        const alreadyExists = StoriesList.filter(lookForExistingId);
        if (alreadyExists) {
          throw new Error(`Story already exists: ${story._id}`);
        }

        // if (!AuthorsMap[story.author]) {
        //   throw new Error(`No such author: ${story.author}`);
        // }

        if (!story.summary) {
          story.summary = story.content.substring(0, 100);
        }

//        post.comments = [];
        story.date = { $date: new Date().toString() };

        StoriesList.push(story);
        return story;
      }
    },

    // createAuthor: {
    //   type: Author,
    //   description: 'Create a new author',
    //   args: {
    //     _id: { type: new GraphQLNonNull(GraphQLString) },
    //     name: { type: new GraphQLNonNull(GraphQLString) },
    //     twitterHandle: { type: GraphQLString }
    //   },
    //   resolve(source, { ...args }) {
    //     const author = args;
    //     if (AuthorsMap[args._id]) {
    //       throw new Error(`Author already exists: ${author._id}`);
    //     }
    //
    //     AuthorsMap[author._id] = author;
    //     return author;
    //   }
    // }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
