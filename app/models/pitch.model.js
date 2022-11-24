const Offer = require('../models/offer.model.js');
const mongoose = require('mongoose');

const PitchSchema = mongoose.Schema({
    entrepreneur: {
        type: String,
        required: true
    },
    pitchTitle: {
        type: String,
        required: true
    },
    pitchIdea: {
        type: String,
        required: true
    },
    askAmount: {
        type: Number,
        min:0,
        required: true
    },
    equity: {
        type: Number,
        min: 0.0,
        max:100.0,
        required: true
    },
    offers: [Offer]
});

PitchSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
}); 

module.exports = mongoose.model('Pitch', PitchSchema); 