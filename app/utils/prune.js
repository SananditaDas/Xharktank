TimestampPrune = function PruneTimestamp(pitch) {
    return {
        entrepreneur: pitch.entrepreneur,
        pitchTitle: pitch.pitchTitle,
        pitchIdea: pitch.pitchIdea,
        askAmount: pitch.askAmount,
        equity: pitch.equity,
        offers: pitch.offers,
        id: pitch._id
    }
}

module.exports = {TimestampPrune}