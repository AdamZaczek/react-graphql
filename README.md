To do:

```text
1. Connect database, chose one option like mongoose (Done), populate database so you can see when queries are working. (Done)  
2. Make Relay Layer Working. (Connected To Relay, No Working Queries Or Mutations Yet)  
3. Create Frontend: index, single story, comments. Delete Google Material Design, add React-Bootstrap(Done).   Bootstrap styles should prolly be shipped with webpack and I shouldnt import all of them.  Delete not working hot reload, but first check it is working for relay.  
4. Add ability to add comments in schema.  
5. Add ability to log in to comment and add a story on a computer, (may make option to chose username and password on mobile) make one user admin.  
6. Add "hot, new and best indexes".  
7. Make comments optimistic.  
8. Make styles the last thing you do, you'll need to style differently on mobile anyways, use google material design.  
9. Add categories (Done). Might want to have stories with multiple categories.  
10. Add hashing password(!).  
```

Hashing passwords:  
https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1  

App requires adding myMongoCredentials.js file to main folder with a link to mongolab database. It looks like this:

```text
export default 'mongodb://SomeMongoLabUsername:SomeMongoLabPassword@ds129189.mlab.com:29189/stories';  
```

Useful queries to test api:  

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
Things to consider:
Delete ^ marks in dependencies.  
Adding redux for managing session specific data. Switching react to preact(!).  
