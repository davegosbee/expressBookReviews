const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const {username, password} = req.body.user;
    
    if (username && password) {
      if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.json(books);
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let book = books[req.params.isbn];
  return res.json(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  
    let filtered_books = Object.values(books).filter (book => book.author === author)
    
    return res.json(filtered_books);
      
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
  
    let filtered_books = Object.values(books).filter (book => book.title === title)
    
    return res.json(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let bookreviews = books[req.params.isbn].reviews;
  return res.json(bookreviews);
});

module.exports.general = public_users;
