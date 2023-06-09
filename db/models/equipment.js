const mongoose = require('mongoose');

const Equipment = mongoose.model('Equipment', {
    name: String,
    amount: Number,
    number: Number,
    status: String,
    maxAmount: Number,
})

module.exports = Equipment;