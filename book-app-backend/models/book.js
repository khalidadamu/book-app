const mongoose = require('mongoose');


const bookSchema = mongoose.Schema ({
     
  _id: mongoose.Schema.Types.ObjectId,
  title: {
     
    type: String,
    required: true,
    unique: true,
  },
  author: String,
  isbn: Number,
  price: {
     
    type: Number,
    required: true,
  },

})

module.exports = mongoose.model('book', bookSchema);