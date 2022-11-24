const PitchModel = require('../models/pitch.model.js');

// // Create and Save a new Pitch
// exports.createPitch = async (req, res) => {
//     try {
//         const response = await PitchService.createPitch(req.body);
//         console.log(response);
//         res.status(201).send(response);
//     } catch (err) {
//         res.status(err.code).send(err.message);
//     }
    
// };


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
        res.send(pitches);
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
        res.status(200).send(pitch);
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

// // Update a pitch identified by the pitchId in the request
// exports.update = (req, res) => {

// };

// // Delete a pitch with the specified pitchId in the request
// exports.delete = (req, res) => {

// };