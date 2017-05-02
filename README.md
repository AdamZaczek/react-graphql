Tasks:

```
1. Add hashing password.
2. Add authentication and login. (needs testing with frontend).
3. Add likes.
4. Add docker(before deploy).
5. Add dataloader.
6. Check if relays alike pagination is fine with Apollo client.
Last one's, after app release:
7. Make subscribtions, nice talk about real time apps here: https://www.youtube.com/watch?v=AYbVMNtO-ro&index=7&list=LLU57QGpPY9E2UmOkREPpMYw&t=577s.
8. Add analytics.
9. Update test queries.
```

https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1  

App requires adding myMongoCredentials.js file to main folder with a link to mongolab database. It looks like this:

```text
export default 'mongodb://SomeMongoLabUsername:SomeMongoLabPassword@ds129189.mlab.com:29189/stories';  
```

Useful queries to test api:  

```javascript
{storiesQuery(first: 5){
  totalCount,
  edges {
    node {
      content
    }
  }
```

```javascript
{customStoriesQuery{content, _author{email, name, age}, comments{_author{email}, content}, createdAt}}  
```

```javascript
query getUser($id: String!) {
  customUserQuery(id: $id) {
    email
  }
}

{
  "id": "58961492734d1d3956c46fd0"
}
```
```javascript
query getUser($count: Int!) {
  customRecentStoriesQuery(count: $count) {
    content
  }
}

{
  "count": 3
}

```

```javascript
query getStories($limit: Int!){customStoriesQuery {
  _id
  title
  category
  summary
  content
  createdAt,
  di
  comments(limit: $limit) {
    content,
    _author{
      age
    }
  }
}}

{
  "limit": 1
}
```

```javascript
mutation CreateUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    email,
    createdAt
  }
}


{
  "email": "nowItDoesWork8@gmail.com",
  "password": "somePassword1"
}

```


```javascript
mutation CreateStory($content: String!, $_author: String!) {
  createStory(content: $content, _author: $_author) {
    content
  }
}

{
  "content": "My very first story yay!",
  "_author": "58961492734d1d3956c46fd0"
}
```

```javascript
mutation CreateComment($content: String!, $_author:String!, $_story: String!) {
  createComment(content: $content, _author: $_author, _story: $_story) {
    content
  }
}

{
  "_story": "58951027734d1d3956c4289a",
  "content": "My very first comment yay!",
  "_author": "58961492734d1d3956c46fd0"
}
```

```javascript
{node(id: "VXNlcjo1ODk2MTQ5MjczNGQxZDM5NTZjNDZmZDA=") {
  ... on User {
    name
  }
}}
```
Things to consider:
Delete ^ marks in dependencies.  
Adding redux for managing session specific data. Switching react to preact(!).  
