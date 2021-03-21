# capstone-server
My first Server for my portfolio capstone project.
[![Build Status](https://travis-ci.org/leny62/capstone.svg?branch=develop)](https://travis-ci.org/leny62/capstone)

# Portfolio api

https://capstone62.herokuapp.com/api/v1

## To get started

# Authentication routes
* ```https://capstone62.herokuapp.com/api/v1/user/login/```
* ```https://capstone62.herokuapp.com/api/v1/user/signUp```
# Blogs
Accessing Blogs
*```https://capstone62.herokuapp.com/api/v1/blogs/```
Accessing one Blog
*```https://capstone62.herokuapp.com/api/v1/blogs/{id}```
Deleting blog
*```https://capstone62.herokuapp.com/api/v1/blogs/delete/{id}```
Updating blog
*```https://capstone62.herokuapp.com/api/v1/blogs/updateBlog/{id}```

# Comments
Getting comments
*```https://capstone62.herokuapp.com/api/v1/comments/```
Getting a comment by id
*```https://capstone62.herokuapp.com/api/v1/comments/{id}```
deleting a comment
*```https://capstone62.herokuapp.com/api/v1/comments/delete/{id}```
# Inquiries
Admin getting all inquiries
*```https://capstone62.herokuapp.com/api/v1/inquiries/```
Admin getting a specific inquiry
*```https://capstone62.herokuapp.com/api/v1/inquiries/{id}```
Admin deleting an inquiry
*```https://capstone62.herokuapp.com/api/v1/inquiries/delete/{id}```

# Users
Getting all users
*```https://capstone62.herokuapp.com/api/v1/user/```
Getting one user
*```https://capstone62.herokuapp.com/api/v1/user/{id}```
Deleting a user
*```https://capstone62.herokuapp.com/api/v1/user/deleteUser/{id}```
Resetting a password
*```https://capstone62.herokuapp.com/api/v1/user/resetPassword/user/{id}```
### Prerequisites

Make sure you have NodeJS installed on your computer by entering  `node -v ` on your terminal.

### Installation

Clone the app
* ```https://github.com/leny62/capstone.git```

Install all the packages
* ```npm install ```

Run the server
*  ```npm start ```

## Testing
Run Test case
* ```npm run test```

