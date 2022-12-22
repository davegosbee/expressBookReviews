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
    return res.status(404).json({message: "Username and password are required."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    
  getAllBooks().then((value) => res.json(value)).catch(() => res.json({}))
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  getBookByISBN(isbn).then((book) => res.json(book)).catch(() => res.json({"message":isbn}));
   
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
  
    getAllBooksByAuthor(author).then((books)=> res.json({books})).catch(()=> res.json({}))
    
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    getAllBooksByTitle(title).then((filtered_books) => res.json(filtered_books)).catch(()=> res.json({}))
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  getAllReviewsByISBN(req.params.isbn).then((bookreviews) => res.json(bookreviews)).catch(() => res.json({}));
 
});

function getAllBooks() {
    let myPromise = new Promise((resolve,reject) => {
          resolve(books)
    })
    return myPromise;
}

function getAllBooksByTitle(title) {
    let myPromise = new Promise((resolve,reject) => {
        let filtered_books = Object.values(books).filter(book => book.title === title)  
        resolve(filtered_books);
    })
    return myPromise;
}

function getAllBooksByAuthor(author) {
    let myPromise = new Promise((resolve,reject) => {
        let filtered_books = Object.values(books).filter(book => book.author === author)  
        resolve(filtered_books);
    })
    return myPromise;
}

function getBookByISBN(isbn) {
    let myPromise = new Promise((resolve,reject) => {
        let book = books[isbn];
        resolve(book);
    });
    return myPromise;
}

function getAllReviewsByISBN(isbn) {
    let myPromise = new Promise((resolve,reject) => {
        let bookreviews = books[isbn].reviews;
        resolve(bookreviews);
    });
    return myPromise;
}

module.exports.general = public_users;
