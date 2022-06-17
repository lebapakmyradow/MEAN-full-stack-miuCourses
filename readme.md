MEAN fullstack Personal Hobby Project description and functionalities.

Backend: Node.js, Express.js
Frontend: Angular, Typescript
Database: MongoDB, Mongoose

Project Description: University courses, its rate, description, code, and professors taught by is listed in the webApp. Jwt token was used for Authentication and Authorization. 

Guest can: 
1. View list of courses, individual courses with ratings in stars
2. Search course name from the course list
3. Register as a user
4. Login as a user

Guest can't:
1. Delete or Edit any course details (Delete=disabled, Edit=hidden)
2. Can not add a new course

Registered User can:
1. Delete course from the list
2. Edit any course 
3. Add a new course
4. Logout
5. Everything guest can do

Authentication and Authorization: Used jsonwebtoken and bcrypt modules of node.js. Created a jwt token
with and expiration stamp and send it with a header






