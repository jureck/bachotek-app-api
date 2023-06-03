const mongoose = require('mongoose');

const Client = mongoose.model('Clients', {
   name: String,
   phone: String,
   pesel: String,
   id: String,
   isDiscount: Boolean,
})

module.exports = Client;