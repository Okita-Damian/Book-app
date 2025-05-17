const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [100, "Name cannot be more than 100 characters"],
  },
  membershipId: {
    type: String,
    required: [true, "Membership ID is required"],
    unique: true,
  },
  membershipExpiryDate: {
    type: Date,
    required: [true, "Expiry date is required"],
    validate: {
      validator: function (v) {
        return v > new Date();
      },
      message: "Expiry date must be in the future",
    },
  },
  booksBorrowed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

module.exports = mongoose.model("Member", MemberSchema);
