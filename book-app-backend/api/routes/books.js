const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Book = require('../../models/book');

router.get("/all-books", checkAuth, (req, res) => {
     Book.find() 
     .exec()
     .then(docs => {
          const response = {
               books: docs.map(doc => {
                    return {
                        title: doc.title,
                        author: doc.author,
                        isbn: doc.isbn,
                        price: doc.price,
               }
          })
          };
          res.status(200).json(response);
     })
     .catch(err => {
          console.log(err);
          res.status(500).json({
               error: err
          });
     });
          
});
     


router.get("/book-details/:bookId", checkAuth, (req, res) => {
     Book.find({_id:id})

     .exec()
     .then (docs => {
          const response = {
               books:docs.map(doc => {
               return {
                    title: docs.title,
                    author: docs.author,
                    _id: docs.id,
                    isbn: docs.isbn,
                    price: docs.price,
               };
          })
     };
     res.status(200).send(response)
})
     .catch (err => {
          console.log(err);
          res.status(500).json({
               error: err
          });
     });
});




     // Update book
router.post("/add-book", checkAuth, (req, res, next) => { 
     const book = new Book({
          title: req.body.title.objectId(),
          author: req.body.author,
          isbn: req.body.isbn,
          price: req.body.price
     })
     book
     .save()
     .then (result => {
          console.log(result)
          res.status(200).json({
               message: 'Book added successfully',
          })
     })
     .catch (err => {
          console.log(err)
          res.status(500).json({
               error: err
          })
     })
})



// Book creation
router.patch ("/update-book/:bookId", checkAuth, (req, res, next) => {
     const id = req.params.bookId;
     const updateOps = {};
     console.log(req.body);

     Book.update({_id:id}, {$set:req.body})
     .exec()
     .then(result => {
               res.status(200).json({
                    message: 'Book updated successfully',
          })
     })
     .catch(err => {
          console.log(err)
          res.status(500).json({
               error: err
          })
     })
})


// Book deletion
router.delete("/delete-book/:bookId", checkAuth, (req, res, next) => {
     const id = req.params.bookId;
     console.log(id)
     Book.remove({_id:id})
    .exec()
    .then(result => { 
     
         res.status(200).json({
            message: 'Book deleted successfully',
          })
     })
     .catch(err => { 
          res.status(500).json ({
               error: err
          })
     })
})


module.exports = router;