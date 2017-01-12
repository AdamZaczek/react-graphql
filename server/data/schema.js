/* eslint-disable no-unused-vars, no-use-before-define */

//Will get rid of underscore soon
import * as _ from 'underscore';
import StoriesList from './mockedData/stories';
import AuthorsMap from './mockedData/authors';
//import {CommentList, ReplyList} from './mockedData/comments';

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

const Category = new GraphQLEnumType({
  name: 'Category',
  description: 'A Category of the Nobodys Stories',
  values: {
    METEOR: {value: 'meteor'},
    PRODUCT: {value: 'product'},
    USER_STORY: {value: 'user-story'},
    OTHER: {value: 'other'}
  }
});

const Author = new GraphQLObjectType({
  name: 'Author',
  description: 'Represent the type of an author of a story or a comment',
  fields: () => ({
    _id: {type: GraphQLString},
    name: {type: GraphQLString},
    twitterHandle: {type: GraphQLString}
  })
});

const HasAuthor = new GraphQLInterfaceType({
  name: 'HasAuthor',
  description: 'This type has an author',
  fields: () => ({
    author: {type: Author}
  }),
  resolveType: (obj) => {
    if(obj.title) {
      return Post;
    } else if(obj.replies) {
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
    _id: {type: GraphQLString},
    title: {type: GraphQLString},
    category: {type: Category},
    summary: {type: GraphQLString},
    content: {type: GraphQLString},
    timestamp: {
      type: GraphQLFloat,
      resolve: function(story) {
        if(story.date) {
          return new Date(story.date['$date']).getTime();
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
      resolve: function({author}) {
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
        category: {type: Category}
      },
      resolve: function(source, {category}) {
        if(category) {
          return PostsList.filter(story => {
            return (story.category === category);
          });
        } else {
          return StoriesList;
        }
      }
    },

    latestStory: {
      type: Story,
      description: 'Latest story in the Nobodys Stories',
      resolve: function() {
        StoriesList.sort((a, b) => {
          var bTime = new Date(b.date['$date']).getTime();
          var aTime = new Date(a.date['$date']).getTime();

          return bTime - aTime;
        });

        return StoriesList[0];
      }
    },

    recentStories: {
      type: new GraphQLList(Story),
      description: 'Recent story in the Nobodys Stories',
      args: {
        count: {type: new GraphQLNonNull(GraphQLInt), description: 'Number of recent stories'}
      },
      resolve: function(source, {count}) {
        StoriesList.sort((a, b) => {
          var bTime = new Date(b.date['$date']).getTime();
          var aTime = new Date(a.date['$date']).getTime();

          return bTime - aTime;
        });

        return StoriesList.slice(0, count);
      }
    },

    story: {
      type: Story,
      description: 'Story by _id',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {_id}) {
        return StoriesList.filter(story => {
          return (story._id === id);
        })[0];
      }
    },

    authors: {
      type: new GraphQLList(Author),
      description: 'Available authors in the Nobodys Stories',
      resolve: function() {
        return [...AuthorsMap];
      }
    },

    author: {
      type: Author,
      description: 'Author by _id',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: function(source, {_id}) {
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
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        content: {type: new GraphQLNonNull(GraphQLString)},
        summary: {type: GraphQLString},
        category: {type: Category},
        author: {type: new GraphQLNonNull(GraphQLString), description: 'Id of the author'}
      },
      resolve: function(source, {...args}) {
        let story = args;
        var alreadyExists = _.findIndex(StoriesList, p => p._id === story._id) >= 0;
        if(alreadyExists) {
          throw new Error('Story already exists: ' + story._id);
        }

        if(!AuthorsMap[story.author]) {
          throw new Error('No such author: ' + story.author);
        }

        if(!story.summary) {
          story.summary = story.content.substring(0, 100);
        }

//        post.comments = [];
        story.date = {$date: new Date().toString()}

        StoriesList.push(story);
        return story;
      }
    },

    createAuthor: {
      type: Author,
      description: 'Create a new author',
      args: {
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}
      },
      resolve: function(source, {...args}) {
        let author = args;
        if(AuthorsMap[args._id]) {
          throw new Error('Author already exists: ' + author._id);
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

//something like this should help me debug query, I can console.log(query) etc
//export Query;
