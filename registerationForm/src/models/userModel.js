const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String }, // partial filter expression --> uniqe email
  phoneNumber: { type: String, required: true },
  nameAndLastName: { type: String, required: true },
  address: { type: String },
  description: { type: String },
  appointmentDate: { type: String },
  appointmentType: { type: String }, // Add appointmentType field
});

module.exports = mongoose.model("User", userSchema);
