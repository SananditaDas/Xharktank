TimestampComparator = function(item_1, item_2) {
    return new Date(item_2.createdAt) - new Date(item_1.createdAt);
}

module.exports = {TimestampComparator}