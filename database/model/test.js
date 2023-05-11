const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        minlength: [8, "username length must be at least 8 characters"],
        maxlength: [8, "number length must be 8 characters"],
      },
  createdAt: { type: Date, default: Date.now() },
});

const TestModel = mongoose.model("Test", TestSchema);

module.exports = TestModel;
