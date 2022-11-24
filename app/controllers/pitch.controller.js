const PitchModel = require('../models/pitch.model.js');
const { TimestampComparator } = require('../utils/comparators');
const { TimestampPrune } = require('../utils/prune');

exports.createPitch = (req, res) => {
    
    // Create a Pitch
    const pitch = new PitchModel({
            entrepreneur: req.body.entrepreneur,
            pitchTitle: req.body.pitchTitle,
            pitchIdea: req.body.pitchIdea,
            askAmount: req.body.askAmount,
            equity: req.body.equity
    });


    // Save Pitch in the database
    pitch.save()
    .then(data => {
        res.status(201).send({ id: data._id });
    }).catch(err => {
        //res.send(err);
        if (err.name === 'ValidationError') {
            return res.status(400).send({
                message: "Pitch content incorrect. "
            });
        }
        else {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Pitch."
            });
        }
        
    });
};



// Retrieve and return all pitchs from the database.
exports.getAllPitches = (req, res) => {
    PitchModel.find()
        .then(pitches => {
            pitches.sort(TimestampComparator);
            _pitches=pitches.map((pitch) => TimestampPrune(pitch));
            res.send(_pitches);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving pitches."
        });
    });
};

// Find a single pitch with a pitchId
exports.getOnePitch = (req, res) => {
    PitchModel.findById(req.params.pitchId)
    .then(pitch => {
        if(!pitch) {
            return res.status(404).send({
                message: "Pitch not found with id " + req.params.pitchId
            });            
        }
        res.status(200).send(TimestampPrune(pitch));
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Pitch not found with id " + req.params.pitchId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving pitch with id " + req.params.pitchId
        });
    });
};
