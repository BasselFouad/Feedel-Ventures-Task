const mongoose = require('mongoose');
const ExchangeRequestSchema  = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: [true, 'Please add the id of the book for exchange']
  },
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, `Please add the id of the user issuing the exchange request` ],
  },
  genre_preferences:[
    {
        type : String,
        enum:['classic','sci-fi','history','non-fiction','biography'],
        required: [true, `Please add the book's genre` ],
    }
]
},
{
  timestamps: true 
}
) ;


module.exports = mongoose.model('ExchangeRequest',ExchangeRequestSchema);

