/* eslint-disable */
/* eslint-disable, no-use-before-define */
/* eslint no-underscore-dangle: off*/
/* eslint "arrow-body-style": off */
/* eslint "no-use-before-define": off */
/* eslint prefer-template: off */
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLEnumType,
} from 'graphql';

import {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} from 'graphql-relay';

import USER from './models/user';
import STORY from './models/story';
import COMMENT from './models/comment';

// const logID = 'qldfjbe2434RZRFeerg'; // random logID that will  remain the same forever for any user logged in, this is the id I use for my FIELD_CHANGE mutation client side

// const {nodeInterface, nodeField} = nodeDefinitions(
//   (globalId) => {
//     const {type, id} = fromGlobalId(globalId);
//
//     switch(expression) {
//         case User:
//           {
//             return USER.find({}, (err, res) => {
//               if (err) return err;
//               return res;
//             });
//           }
//             break;
//         case Story:
//           {
//             return STORY.find({}, (err, res) => {
//               if (err) return err;
//               return res;
//             });
//           }
//             break;
//         case Comment:
//           {
//             return COMMENT.find({}, (err, res) => {
//               if (err) return err;
//               return res;
//             });
//           }
//             break;
//         default:
//             return null;
//     }
//     if (type === 'Game') {
//       return getGame(id);
//     } else if (type === 'HidingSpot') {
//       return getHidingSpot(id);
//     } else {
//       return null;
//     }
//   },
//   (obj) => {
//     if (obj instanceof Game) {
//       return gameType;
//     } else if (obj instanceof HidingSpot) {
//       return hidingSpotType;
//     } else {
//       return null;
//     }
//   }
// );
//



const getPrettyDate = (date) => {
  return ('0' + date.getDate()).slice(-2) + '/'
            + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
            + date.getFullYear();
};

const Reaction = new GraphQLEnumType({
  name: 'Reactions',
  values: {
    LIKE: { value: 0 },
    DISLIKE: { value: 1 },
    LOVE: { value: 2 },
    ANGER: { value: 3 }
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'Represents user of the application',
  fields: () => ({
    id: globalIdField('User'),
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (user) => {
        if (user.createdAt) {
          const creationDate = new Date(user.createdAt);
          const formattedDate = getPrettyDate(creationDate);
          return formattedDate;
        }
        return null;
      }
    },
    updatedAt: { type: GraphQLString },
    stories: {
      type: new GraphQLList(Story),
      args: {
        limit: { type: GraphQLInt, description: 'Limit the returning stories' }
      },
      resolve: (user, { limit }) => {
        let ary = [];
        ary = user.stories.map((story) => {
          return STORY.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res;
          });
        });
        if (limit >= 0) {
          return ary.slice(0, limit);
        }
        return ary;
      }
    },
    // todo: test, mock reactions
    storiesWithReactions: {
      type: new GraphQLList(Story),
      description: 'List stories user reacted to',
      args: {
        limit: {
          description: 'Limit the returning liked comments',
          type: GraphQLInt
        },
        reactionType: {
          description: 'Search only for certain reactions',
          type: Reaction
        }
      },
      resolve: (user, { ...args }) => {
        let ary = [];
        ary = user.storyLikes.map((story) => {
          return STORY.findOne({ _id: story }, (err, res) => {
            if (err) return err;
            return res;
          });
        });
        // if (args.reactionType) {
        //   ary = ary.filter(singleStory => {
        //     return singleStory.
        //   });
        // }
        if (args.limit >= 0) {
          return ary.slice(0, args.limit);
        }
        return ary;
      }
    },
    commentsWithReactions: {
      type: new GraphQLList(Comment),
      description: 'List comments user reacted to',
      args: {
        limit: {
          description: 'Limit the returning liked comments',
          type: GraphQLInt
        },
        reactionType: {
          description: 'Search only for certain reactions',
          type: Reaction
        }
      },
      resolve: (user, { ...args }) => {
        let ary = [];
        ary = user.commentsWithReactions.map((comment) => {
          return COMMENT.findOne({ _id: comment }, (err, res) => {
            if (err) return err;
            return res;
          });
        });
        if (args.limit >= 0) {
          return ary.slice(0, args.limit);
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
    id: globalIdField('Comment'),
    _author: {
      type: User,
      resolve: (parentComment) => {
        return USER.findOne({ _id: parentComment._author });
      }
    },
    _story: {
      type: Story,
      resolve: (parentComment) => {
        return STORY.findOne({ _id: parentComment._story });
      }
    },
    summary: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (comment) => {
        if (comment.createdAt) {
          const creationDate = new Date(comment.createdAt);
          const formattedDate = getPrettyDate(creationDate);
          return formattedDate;
        }
        return null;
      }
    },
    // need likes and dislikes
  })
});

const Story = new GraphQLObjectType({
  name: 'Story',
  description: 'Represent the type of a story',
  fields: () => ({
    id: globalIdField('Story'),
    summary: { type: GraphQLString },
    content: { type: GraphQLString },
    createdAt: {
      type: GraphQLString,
      resolve: (story) => {
        if (story.createdAt) {
          const creationDate = new Date(story.createdAt);
          const formattedDate = getPrettyDate(creationDate);
          return formattedDate;
        }
        return null;
      }
    },
    comments: {
      type: new GraphQLList(Comment),
      args: {
        limit: { type: GraphQLInt, description: 'Limit the returning comments' }
      },
      resolve: (story, { limit }) => {
        let commAry = [];
        commAry = story.comments.map((comment) => {
          return COMMENT.findOne({ _id: comment }, (err, res) => {
            if (err) return err;
            return res;
          });
        });
        if (limit >= 0) {
          return commAry.slice(0, limit);
        }
        return commAry;
      }
    },
    _author: {
      type: User,
      resolve: (parentStory) => {
        return USER.findOne({ _id: parentStory._author });
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'NobodysStoriesSchema',
  description: 'Root query',
  fields: () => ({
    storiesQuery: {
      type: new GraphQLList(Story),
      description: 'List of stories',
      resolve: () => {
        return STORY.find({}, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    },
    storyQuery: {
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
    latestStoryQuery: {
      type: Story,
      description: 'Latest story',
      resolve: () => {
        return STORY.findOne({}).sort('-date').exec((err, docs) => {
          if (err) return err;
          return docs;
        });
      },
    },
    recentStoriesQuery: {
      type: new GraphQLList(Story),
      description: 'Recent story',
      args: {
        count: { type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent stories' }
      },
      resolve: (source, { count }) => {
        return STORY.find({}).sort('-date').limit(count).exec((err, docs) => {
          if (err) return err;
          return docs;
        });
      },
    },
    usersQuery: {
      type: new GraphQLList(User),
      description: 'Available users',
      resolve() {
        return USER.find({}, (err, res) => {
          if (err) return err;
          return res;
        });
      }
    },
    userQuery: {
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
        _author: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (story, { ...args }) => {
        const summary = args.content.substring(0, 100);
        const newStory = new STORY({
          ...args,
          summary
        });
        newStory.save((err, res) => {
          if (err) return err;
          return res;
        });
        return newStory;
      }
    },
    createUser: {
      type: User,
      description: 'Create a new user',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (user, { ...args }) => {
        const newUser = new USER({
          ...args
        });
        newUser.save((err, res) => {
          if (err) return err;
          return res;
        });
        return newUser;
      }
    },
    createComment: {
      type: Comment,
      description: 'Create a new comment',
      args: {
        _author: { type: new GraphQLNonNull(GraphQLString) },
        _story: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (user, { ...args }) => {
        const summary = args.content.substring(0, 40);
        const newComment = new COMMENT({
          ...args,
          summary
        });
        newComment.save((err, res) => {
          if (err) return err;
          return res;
        });
        return newComment;
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
