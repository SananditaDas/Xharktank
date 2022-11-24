const mongoose = require('mongoose');
const { Schema } = require("mongoose");

// const OfferSchema = mongoose.Schema({
//     investor: String,
//     amount: Number,
//     equity: Number,
//     comment: String
// }, {
//     timestamps: true
// });

// module.exports = mongoose.model('Offer', OfferSchema);

const OfferSchema = new Schema({
    investor: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        min: 0.0,
        required: true
    },
    equity: {
        type: Number,
        min: 0.0,
        max:100.0,
        required: true
    },
    comment: {
        type: String
    },
});

OfferSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports =OfferSchema;