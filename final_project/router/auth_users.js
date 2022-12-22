const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
    username: 'administrator',
    password: 'password'
    },
];

const isValid = (username)=>{ //returns boolean
    let filtered_users = users.filter((user) => user.username === username);
    return filtered_users.length > 0;
}

const authenticatedUser = (username,password)=>{ //returns boolean
    let filtered_users = users.filter((user) => user.username === username && user.password === password);
    return filtered_users.length > 0;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.user;
    
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    const {username, password} = req.body.user;
    if(authenticatedUser(username, password))
    {
        let accessToken = jwt.sign({
            data: user
        }, "fingerprint_customer", { expiresIn: 60 * 60 });
        
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).json({message: "User successfully logged in"});
    }
    else
    {
        return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
