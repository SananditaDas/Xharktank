const OfferModel = require('../models/offer.model.js');
const OfferService = require('../services/offer.service.js');

exports.createOffer = (req, res) => {
    offer = {
        investor: req.body.investor,
        amount: req.body.amount,
        equity: req.body.equity,
        comment: req.body.comment
    };
    pitchId = req.params.pitchId;

    OfferService.createOffer(pitchId, offer)
    .then(pitchId => {
        res.status(201).send({ id: pitchId });
    }).catch(err => {
        res.status(err.errorCode).send(err.errorMessage);
    });
};
