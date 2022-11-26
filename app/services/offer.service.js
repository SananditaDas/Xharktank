const PitchModel = require('../models/pitch.model.js');
const PitchRepository = require('../repository/pitch.repository.js');

exports.createOffer = (pitchId, offer) => {
    return new Promise((resolve, reject) => {
        PitchRepository.findOne(pitchId)
            .then(pitch => {
                pitch.offers.push(offer);
                PitchRepository.savePitch(pitch)
                .then(() => {
                    resolve(pitchId);
                }).catch(err => {
                    reject(err);
                })
                
        }).catch(err => {
            reject(err);
        });
    });
};