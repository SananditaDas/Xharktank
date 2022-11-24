module.exports = (app) => {
    const PitchController = require('../controllers/pitch.controller.js');
    const OfferController = require('../controllers/offer.controller.js');

    // Create a new Pitch
    app.post('/pitches', PitchController.createPitch);

    // Create an offer
    app.post('/pitches/:pitchId/makeOffer',OfferController.createOffer);


    // Retrieve all Pitches
    app.get('/pitches', PitchController.getAllPitches);

    // Retrieve a single Pitch with pitchId
    app.get('/pitches/:pitchId', PitchController.getOnePitch);

}