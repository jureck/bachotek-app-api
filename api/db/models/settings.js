const mongoose = require('mongoose');

const Settings = mongoose.model('Settings', {
   priceList: Array,
   alertTime: Number
})

module.exports = Settings;