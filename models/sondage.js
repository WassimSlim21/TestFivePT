var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Sondage = new Schema({


    title: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: {
        type: String
    },
    created_at: {
        type: Date,

    },
    updated_at: {
      type: Date,

  }
  


});



module.exports = mongoose.model('Sondage', Sondage);
