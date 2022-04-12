const mongoose = require('mongoose');
const validator = require('validator')
const UserSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  phone_number: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: [true,"Phone number has already been used"] ,
  },
  email:{
    type : String,
    required: [true, 'Please add your Email'],
    validate: [validator.isEmail, 'Please enter a valid email'],
    unique:[true,'Email has already been used']
  },
  preferences:[{
      type : String,
      enum:['classic','sci-fi','history','non-fiction','biography']
  }]
  
},
{
  timestamps: true 
}
) ;


module.exports = mongoose.model('User',UserSchema);

