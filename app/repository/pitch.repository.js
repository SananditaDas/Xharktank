const PitchModel = require('../models/pitch.model.js');

exports.savePitch = (pitch) => {
    return new Promise((resolve, reject) => {
        pitch.save()
            .then(data => {
                resolve(data);
            }).catch(err => {
                if (err.name === 'ValidationError') {
                    error = { errorCode: 400, errorMessage: "Pitch content incorrect." };
                    reject(error);
                }
                else {
                    error = { errorCode: 500, errorMessage: err.message || "Some error occurred while creating the Pitch." };
                    reject(error);
                }
            });
    });
};

exports.findAll = () => {
    return new Promise((resolve, reject) => {
        PitchModel.find()
        .then(pitches => {
            resolve(pitches);
        }).catch(err => {
            error = { errorCode: 500, errorMessage: err.message || "Some error occurred while retrieving pitches." };
            reject(error);
        });
    });
    
};

exports.findOne = (pitchId) => {
    return new Promise((resolve, reject) => {
        PitchModel.findById(pitchId)
        .then(pitch => {
            if (!pitch) {
                error = { errorCode: 404, errorMessage: "Pitch not found with id " + pitchId };
                reject(error);         
            }
            resolve(pitch);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                error = { errorCode: 404, errorMessage: "Pitch not found with id " + pitchId };
                reject(error); 
            }
            else {
                error = { errorCode: 500, errorMessage: "Error retrieving pitch with id " + pitchId };
                reject(error);  
            }
        });
    })
};