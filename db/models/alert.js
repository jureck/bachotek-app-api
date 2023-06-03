const mongoose = require('mongoose');

const Alert = mongoose.model('Alerts', {
   addedAt: String,
   startTime: String,
   approxTime: String,
   name: String
})

module.exports = Alert;