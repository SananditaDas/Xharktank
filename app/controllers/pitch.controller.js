const PitchModel = require('../models/pitch.model.js');
const { TimestampComparator } = require('../utils/comparators');
const { TimestampPrune } = require('../utils/prune');
const PitchService = require('../services/pitch.service.js');

// Create a pitch with the details
exports.createPitch = (req, res) => {
    
    // Create pitch model
    const pitch = new PitchModel({
            entrepreneur: req.body.entrepreneur,
            pitchTitle: req.body.pitchTitle,
            pitchIdea: req.body.pitchIdea,
            askAmount: req.body.askAmount,
            equity: req.body.equity
    });

    PitchService.createPitch(pitch)
        .then(pitchId => {
            res.status(201).send({ id: pitchId });
        }).catch(err => {
            res.status(err.errorCode).send(err.errorMessage);
        });
};

// Retrieve and return all pitchs from the database.
exports.getAllPitches = (req, res) => {
    
    PitchService.getAllPitches()
        .then(pitches => {
            res.status(200).send(pitches);
        }).catch(err => {
            res.status(err.errorCode).send(err.errorMessage);
        });

};

// Find a single pitch with a pitchId
exports.getOnePitch = (req, res) => {

    PitchService.getOnePitch(req.params.pitchId)
        .then(pitch => {
            res.status(200).send(pitch);
        }).catch(err => {
            res.status(err.errorCode).send(err.errorMessage);
        });
};
