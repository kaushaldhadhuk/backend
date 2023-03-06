const mongoose = require("mongoose");
// var AutoIncrement = require("mongoose-sequence")(mongoose);

const sizeSchema = mongoose.Schema({
//   size_id: { type: Number },
  size_name: { type: String },
});
// sizeSchema.plugin(AutoIncrement, { inc_field: "size_id" });
module.exports = mongoose.model("sizes", sizeSchema);
