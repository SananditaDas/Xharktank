const PitchModel = require('../models/pitch.model.js');
const Offer = require('../models/offer.model.js');

// Create and Save a new Pitch
exports.createOffer = (req, res) => {

    // if (!req.body.investor ||
    //     !req.body.amount ||
    //     !req.body.equity ||
    //     !req.body.comment) {
        
    //     return res.status(400).send({
    //         message: "Offer content incorrect"
    //     });
    // }

    PitchModel.findById(req.params.pitchId)
        .then(pitch => {
        if(!pitch) {
            return res.status(404).send({
                message: "Pitch not found with id " + req.params.pitchId
            });            
        }
        else {
            
            pitch.offers.push({
                investor: req.body.investor,
                amount: req.body.amount,
                equity: req.body.equity,
                comment: req.body.comment
            });

            pitch.save()
            .then(data => {
                res.status(201).send({ id: req.params.pitchId });
            }).catch(err => {
                if (err.name === 'ValidationError') {
                    return res.status(400).send({
                        message: "Offer content incorrect."
                    });
                }
                else {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Pitch."
                    });
                }
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Pitch."
                });
            });
        }
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
