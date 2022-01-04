var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vote = new Schema({


    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index : true
    },
    sondage_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sondage",
        index : true

    },
    vote: {
        type: Boolean
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }
});
Vote.index({ user_id: 1, sondage_id: 1 }, { unique: true });

module.exports = mongoose.model('Vote', Vote);
