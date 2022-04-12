const mongoose = require('mongoose');
const validator = require('validator')
const BookSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  author: {
    type: String,
    required: [true, `Please add the book's author` ],
  },
  description:{
      type : String,
      validate(value){
        if(!validator.isLength(value,{min:10,max:500})){
          throw Error("Length of the description should be between 10-500 characters");
      }
      },
      required: [true, `Please add the book's short description` ]
  },
  genre:{
      type : String,
      enum:['classic','sci-fi','history','non-fiction','biography'],
      required: [true, `Please add the book's genre` ],
  },
  image_path:{
      type:String,
      required: [true, `Please add the book's picture` ],
  }
  
},
{
  timestamps: true 
}
) ;


module.exports = mongoose.model('Book',BookSchema);

