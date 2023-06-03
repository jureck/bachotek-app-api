const mongoose = require('mongoose');

const Reservation = mongoose.model('Reservation', {
    status: String,
    addedAt: Date,
    startDay: String,
    clientId: String,
    equipment: Array,
    startDate: String,
    approxDate: String,
    endDate: String,
    cost: Number,
    paid: Number,
    comments: String
})

module.exports = Reservation;