var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  passwordDigest: { type: String, required: true },
  positions: [{
    symbol: String,
    purchase_date: Date,
    quantity: Number
  }]
});

// Do I need this? Am I going to use it?
userSchema.statics.findOrCreateByEmail = function (params, callback) {
  this.findOne({
    email: params.email
  }, function (err, user) {
    if (err) {
      callback(err, null);
    } else if (user) {
      callback(null, user);
    } else {
      this.model.create(params, callback);
    }
  });
};

var User = mongoose.model('User', userSchema);

module.exports = User;
