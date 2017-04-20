Tasks:

!-- Integrate With Relay Modern --!
!-- Make Mutations Work With Relay, Test Relay And Relay Modern Differences --!
!-- Populate User.stories Array When Creating A Story --!

```
1. Connect database, chose one option like mongoose (Done), populate database so you can see when queries are working. (Done)  
2. Make Relay Layer Working. (Connected To Relay, Frontend is not making queries yet). Make sure pagination is working right.
3. Create Frontend: index, single story, comments. Delete Google Material Design, add React-Bootstrap(Done).   Bootstrap styles should prolly be shipped with webpack and I shouldn't import all of them.  Delete not working hot reload, but first check it is working for relay.  
4. Add ability to add comments in schema.(Done)
5. Add ability to log in to comment and add a story on a computer, (may make option to chose username and password on mobile) make one user admin.  
6. Add "hot, new and best indexes".
7. Make comments optimistic.(not gonna happen)
8. Make styles the last thing you do, you'll need to style differently on mobile anyways.  
9. Add categories (Done). Might want to have stories with multiple categories.  
10. Add hashing password(!).(parth of Auth0 changes)
11. Consider migration to postgres or dynamodb.(done, not gonna happen)
12. Add authentication and login. (in progress)
13. Add seeding method(done)
14. Decouple front and backend, build backend with webpack(webpack building done).
15. Add docker(before deploy)
16. Add dataloader and Node Interface!
17. Make subscribtions, nice talk about real time apps here: https://www.youtube.com/watch?v=AYbVMNtO-ro&index=7&list=LLU57QGpPY9E2UmOkREPpMYw&t=577s.
18. Add analytics.
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
