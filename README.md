App requires adding myMongoCredentials.js file to sever folder with a link to mongolab database. It looks like this:

```text
export default 'mongodb://SomeMongoLabUsername:SomeMongoLabPassword@ds129189.mlab.com:29189/stories';  
```

Useful queries to test api: 

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
query storiesQuery($limit: Int!) {
  storiesQuery {
    edges {
      node {
      	id
        content
        createdAt
        comments(limit: $limit) {
          content
          _author {
            name
          }
        }
      }
    }
  }
}

{
  "limit": 2
}
``` 

```javascript
{
  storiesQuery(first: 5) {
    totalCount
    edges {
      node {
        content
      }
    }
  }
}
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
query getStory($count: Int!) {
  recentStoriesQuery(count: $count) {
    content
  }
}

{
  "count": 3
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
{
  node(id: "VXNlcjo1ODk2MTQ5MjczNGQxZDM5NTZjNDZmZDA=") {
    ... on User {
      name
    }
  }
}
```
