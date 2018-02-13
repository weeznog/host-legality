const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = mongoose.model('user');
const _ = require('lodash');
// const Host = mongoose.model('Host');

const propertySchema = new Schema({
  address: {
    type: String,
    required: [true, 'address is required']
  },
  unitNumber: {
    type: String
  },
  googleData: {
    type: Schema.Types.Mixed,
    required: [true, 'googleData is required'],
    select: false
  },
  // _host: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Host',
  //   required: [true, 'host is required']
  // },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'user is required']
  },
  status: {
    type: String,
    required: [true, 'status is required'],
    default: 'pending-payment',
    enum: ['pending-payment', 'paid', 'complete']
  }
});

propertySchema.pre('save', save);
propertySchema.pre('findOne', findOne);
propertySchema.pre('find', find);

function save(next) {
  const property = this;
  property.address = _.replace(property.address, ', USA', '');
  next();
}
function find(next) {
  const property = this;
  property.populate('_user');
  // property.populate(_host);
  next();
}
function findOne(next) {
  const property = this;
  // property.populate();
  // property.populate(_host);
  next();
}

// propertySchema.methods.comparePassword = function(canidatePassword, cb) {
//   const property = this;
// };

mongoose.model('property', propertySchema);
