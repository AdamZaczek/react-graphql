/* eslint-disable no-unused-vars, no-use-before-define */
/* For now im disabling eslint here, settings */
/* eslint-disable! */
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
import StoriesList from './mockedData/stories';
import AuthorsMap from './mockedData/authors';
// import {CommentList, ReplyList} from './mockedData/comments';

const MongooseSchema = mongoose.Schema;


const STORY = mongoose.model('Story', new MongooseSchema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  category: String,
  summary: String,
  content: String,
  timestamp: Number
}));

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'A Category of the Nobodys Stories',
  values: {
    METEOR: { value: 'meteor' },
    PRODUCT: { value: 'product' },
    USER_STORY: { value: 'user-story' },
    OTHER: { value: 'other' }
  }
});

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a story or a comment',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    twitterHandle: { type: GraphQLString }
  })
});

const HasAuthor = new GraphQLInterfaceType({
  name: 'HasAuthor',
  description: 'This type has an author',
  fields: () => ({
    author: { type: Author }
  }),
  resolveType: (obj) => {
    if (obj.title) {
      return Post;
    } else if (obj.replies) {
      return Comment;
    } else {
      return null;
    }
  }
});

// const Comment = new GraphQLObjectType({
//   name: 'Comment',
//   interfaces: [HasAuthor],
//   description: 'Represent the type of a comment',
//   fields: () => ({
//     _id: {type: GraphQLString},
//     content: {type: GraphQLString},
//     author: {
//       type: Author,
//       resolve: function({author}) {
//         return AuthorsMap[author];
//       }
//     },
//     timestamp: {type: GraphQLFloat},
//     replies: {
//       type: new GraphQLList(Comment),
//       description: 'Replies for the comment',
//       resolve: function() {
//         return ReplyList;
//       }
//     }
//   })
// });

const Story = new GraphQLObjectType({
  name: 'Story',
  interfaces: [HasAuthor],
  description: 'Represent the type of a story',
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: Category },
    summary: { type: GraphQLString },
    content: { type: GraphQLString },
    timestamp: {
      type: GraphQLFloat,
      resolve(story) {
        if (story.date) {
          return new Date(story.date.$date).getTime();
        } else {
          return null;
        }
      }
    },
    // comments: {
    //   type: new GraphQLList(Comment),
    //   args: {
    //     limit: {type: GraphQLInt, description: 'Limit the returning comments'}
    //   },
    //   resolve: function(post, {limit}) {
    //     if(limit >= 0) {
    //       return CommentList.slice(0, limit);
    //     }
    //
    //     return CommentList;
    //   }
    // },
    author: {
      type: Author,
      resolve({ author }) {
        return AuthorsMap[author];
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'NobodysStoriesSchema',
  description: 'Root of the Nobodys Stories',
  fields: () => ({
    stories: {
      type: new GraphQLList(Story),
      description: 'List of stories in the Nobodys Stories',
      args: {
        category: { type: Category }
      },
      resolve(source, { category }) {
        if (category) {
          return PostsList.filter(story => (story.category === category));
        } else {
          return StoriesList;
        }
      }
    },

    latestStory: {
      type: Story,
      description: 'Latest story in the Nobodys Stories',
      resolve() {
        StoriesList.sort((a, b) => {
          const bTime = new Date(b.date.$date).getTime();
          const aTime = new Date(a.date.$date).getTime();

          return bTime - aTime;
        });

        return StoriesList[0];
      }
    },

    recentStories: {
      type: new GraphQLList(Story),
      description: 'Recent story in the Nobodys Stories',
      args: {
        count: { type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent stories' }
      },
      resolve(source, { count }) {
        StoriesList.sort((a, b) => {
          const bTime = new Date(b.date.$date).getTime();
          const aTime = new Date(a.date.$date).getTime();

          return bTime - aTime;
        });

        return StoriesList.slice(0, count);
      }
    },

    story: {
      type: Story,
      description: 'Story by _id',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, { _id }) {
        return StoriesList.filter(story => (story._id === id))[0];
      }
    },

    authors: {
      type: new GraphQLList(Author),
      description: 'Available authors in the Nobodys Stories',
      resolve() {
        return [...AuthorsMap];
      }
    },

    author: {
      type: Author,
      description: 'Author by _id',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(source, { _id }) {
        return AuthorsMap[_id];
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
        author: { type: new GraphQLNonNull(GraphQLString), description: 'Id of the author' }
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

        if (!AuthorsMap[story.author]) {
          throw new Error(`No such author: ${story.author}`);
        }

        if (!story.summary) {
          story.summary = story.content.substring(0, 100);
        }

//        post.comments = [];
        story.date = { $date: new Date().toString() };

        StoriesList.push(story);
        return story;
      }
    },

    createAuthor: {
      type: Author,
      description: 'Create a new author',
      args: {
        _id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        twitterHandle: { type: GraphQLString }
      },
      resolve(source, { ...args }) {
        const author = args;
        if (AuthorsMap[args._id]) {
          throw new Error(`Author already exists: ${author._id}`);
        }

        AuthorsMap[author._id] = author;
        return author;
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;

// something like this should help me debug query, I can console.log(query) etc
// export Query;
