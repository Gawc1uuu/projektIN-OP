import { Schema, model, Types } from "mongoose";
import House from "./housesModel";

const tripSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    createdBy: {
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
    },

    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    guests: [{ type: Schema.Types.ObjectId, ref: "User" }],
    houses: [{ type: Schema.Types.ObjectId, ref: "House" }],
  },
  { timestamps: true }
);

tripSchema.post("findOneAndDelete", async (doc) => {
  await House.deleteMany({ trip: doc._id });
});

const Trip = model("Trip", tripSchema);

export default Trip;
