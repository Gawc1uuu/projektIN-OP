import mongoose, { Schema, model, Types } from "mongoose";

const houseSchema = new Schema({
  beds: {
    type: Number,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const House = mongoose.model("House", houseSchema);

export default House;
