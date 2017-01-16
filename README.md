ToDO:

1. Connect database, chose one option like mongoose (Done), populate database so you can see when queries are working
2. Make Relay Layer Working (Connected To Relay, No Working Queries Or Mutations Yet)
3. Create Frontend: index, single story, comments
4. Add ability to add comments in schema
5. Add ability to log in to comment and add a story on a computer, (may make option to chose username and password on mobile) make one user admin
6. Add "hot, new and best indexes"
7. Make comments optimistic
8. Make styles the last thing you do, you'll need to style differently on mobile anyways, use google material design
9. Add categories

To connect to database:
Go to C:\Program Files\MongoDB\Server\3.4, open cmd and run mongod --dbpath and drop data folder on the cmd to copy it's location.
The entire command with current folder locations looks like this:
mongod --dbpath "D\programowanie 2\relay-fullstack\data"

How to set up security in Mongo:
http://tgrall.github.io/blog/2015/02/04/introduction-to-mongodb-security/


To seed database:
Link to knowhow: https://docs.mongodb.com/manual/reference/program/mongoimport/#use

Command to seed stories: mongoimport --db stories --collection stories --file seeds/seeds.json --Still needs testing(graphql sees my new data, nice!)
