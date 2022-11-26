const PitchModel = require('../models/pitch.model.js');
const { TimestampComparator } = require('../utils/comparators');
const { TimestampPrune } = require('../utils/prune');
const PitchRepository = require('../repository/pitch.repository.js');

exports.createPitch = (pitch) => {
    return new Promise((resolve, reject) => {
        PitchRepository.savePitch(pitch)
            .then(pitch_saved => {
                resolve(pitch_saved._id);
            }).catch(err => {
                reject(err);
            });
    });
};

exports.getAllPitches = () => {
    return new Promise((resolve, reject) => {
        PitchRepository.findAll()
        .then(pitches => {
            pitches.sort(TimestampComparator);
            _pitches = pitches.map((pitch) => TimestampPrune(pitch));
            resolve(_pitches);

        }).catch(err => {
            reject(err);
        });

    });    
};

exports.getOnePitch = (pitchId) => {
    return new Promise((resolve, reject) => {
        PitchRepository.findOne(pitchId)
        .then(pitch => {
            resolve(TimestampPrune(pitch));
        }).catch(err => {
            reject(err);
        });
    })
}