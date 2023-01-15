

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const User = require('../../models/user');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


router.post('/signup',  (req, res, next) => {
     // checking if the user already exits
   console.log(req.body.email);
   User.find({email: req.body.email})
   .exec().then(user => {
     if (user.length >= 1 ) {
          return res.status(409).json ({
               message: 'User already exists'
          })

     } 
     else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
               if (err) {
                    return res.status(500).json ({
                        message: 'Internal server error'
                    })
               }
               else { 
                    // creating an instance of user model
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        name: req.body.name,
                        user_type:'user'
                    });

                    // saving the user in the database
                    user.save()
                    .then(result => {
                         res.status(201).json({
                         message: 'User created successfully',
                         })
                    })

                    .catch (err => {
                         res.status(500).json({
                              message: 'Internal server error',
                                error:err
                                })
                         })
                    }
                })
          }
     })
})


router.post('/admin-signup', (req, res, next) => {

     // checking if the user already exits
   console.log(req.body.email);
   User.find({email: req.body.email})
   .exec()
   .then(user => {
     if(user.length > 1) {
          return res.status(409).json ({
               message: 'Email already exists'
     });
     }
     else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
               if (err) {
                    return res.status(500).json ({
                       error:err
                    })
               
          
               }
               else {
                    // creating an instance of user model
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password:hash,
                        name: req.body.name,
                        user_type:'admin'
                    });
               
                    // saving the user in the database
                    user.save()
                    .then(result => {
                         res.status(201).json({
                         message: 'Admin created successfully',
                         })
                    })
                    .catch(err => {
                         res.status(500).json({
                              message: 'Admin created failed',
                              error:err
                              })
                         })
                    }
               
                })

               }   
          
      
     })
})


                  
router.post('/login', (req, res, next) => {
     console.log(req.body.email);
     console.log(req.body.password);
     User.find({email: req.body.email})
     .exec()
     .then(user => { 
          if (user.length < 1) { 
               return res.status(401).json ({ 
                    message: 'User not found'
          })
     }
     bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
               return res.status(401).json ({
                    message: 'Wrong password'
     })
}

     if (result ) {
               const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id,
     },
     'secret',
     {
         expiresIn: '1h'
     }
     
     )

       return res.status(200).json({ 
          
          message: 'Login successful',
          user_type:user[0].user_type,
          token:token
       })
     }
     res.status(401).json ({
          
          message: 'Wrong password'
})
     })
})

.catch(err => {
     res.status(500).json({
         error:err 
})
})
})

module.exports = router







 