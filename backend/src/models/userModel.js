const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'] // Regex for email validation
  },
  password: { 
    type: String, 
    required: true 
  },
});

module.exports = mongoose.model('User', userSchema);
