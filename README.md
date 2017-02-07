ToDO:

1. Connect database, chose one option like mongoose (Done), populate database so you can see when queries are working (Done)
2. Make Relay Layer Working (Connected To Relay, No Working Queries Or Mutations Yet)
3. Create Frontend: index, single story, comments. Delete Google Material Design, add React-Bootstrap(Done). Bootstrap styles should prolly be shipped with webpack and I shouldny import all of them.
4. Add ability to add comments in schema
5. Add ability to log in to comment and add a story on a computer, (may make option to chose username and password on mobile) make one user admin
6. Add "hot, new and best indexes"
7. Make comments optimistic
8. Make styles the last thing you do, you'll need to style differently on mobile anyways, use google material design
9. Add categories (Done). Might want to have stories with multiple cattegories.
10. Add hashing password.


Mongod startuje bazę danych, mongo pozwala na wysyłanie zapytań, wstawianie danych, itp.
To connect to database:
Go to C:\Program Files\MongoDB\Server\3.4, open cmd and run mongod --dbpath and drop data folder on the cmd to copy it's location.
The entire command with current folder locations looks like this:
mongod --dbpath "D:\programowanie 2\relay-fullstack\data"

Hashing passwords:
https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

App requires adding myMongoCredentials.js file to main folder with a link to mongolab database. It looks like this:
export default 'mongodb://SomeMongoLabUsername:SomeMongoLabPassword@ds129189.mlab.com:29189/stories';

Things to consider: Delete ^ marks in dependencies.
