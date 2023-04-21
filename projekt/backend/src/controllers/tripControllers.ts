import mongoose, { ObjectId, Schema, Types, Mongoose } from "mongoose";
import { Request, Response } from "express";
import cloudinaryInstance from "../utils/cloudinary";
import Trip from "../models/tripModel";
import House from "../models/housesModel";
import User from "../models/userModel";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

// get all recipes
const getTrips = async (req: Request, res: Response) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);

  const [trips, total] = await Promise.all([
    Trip.find({}).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Trip.countDocuments(),
  ]);

  res.status(200).json({
    currentPage: Number(page),
    totalPages: Math.ceil(total / Number(limit)),
    trips,
  });
};

//get single recipe
const getTrip = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const trip = await Trip.findById(id).populate("houses");
  if (!trip) {
    return res.status(404).json({ error: "No such trip" });
  }
  return res.status(200).json(trip);
};

//create new recipe
const createTrip = async (req: AuthenticatedRequest, res: Response) => {
  const { name, destination, transport, price, startDate, endDate, image } =
    req.body;
  const user = req.user;

  try {
    const result = await cloudinaryInstance.uploader.upload(image, {
      folder: "wycieczki",
      quality: 80,
      width: 500,
      heigth: 500,
    });

    const trip = await Trip.create({
      name,
      destination,
      transport,
      price,
      startDate,
      endDate,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdBy: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        user_id: user._id,
      },
    });
    res.status(200).json(trip);
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete a recipe
const deleteTrip = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const deleteImage = (publicId: string) => {
    cloudinaryInstance.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.log("Error deleting image from Cloudinary", error);
      } else {
        console.log("Image deleted from Cloudinary", result);
      }
    });
  };

  const trip = await Trip.findOneAndDelete({ _id: id });
  if (!trip) {
    return res.status(404).json({ error: "No such trip" });
  }

  // if (recipe.createdBy?.user_id !== _id) {
  //   return res
  //     .status(400)
  //     .json({ error: "Only author can delete his own recipes" });
  // }
  deleteImage(trip.image?.public_id!);
  return res.status(200).json(trip);
};
//edit recipe
const updateTrip = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Id not valid" });
  }

  const trip = await Trip.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!trip) {
    return res.status(404).json({ error: "No such recipe" });
  }
  return res.status(200).json(trip);
};

// adding a new house
const addHouse = async (req: Request, res: Response) => {
  const { id: tripId } = req.params;
  const { adress, beds } = req.body;

  try {
    const newHouse = await House.create({ adress, beds });

    const trip = await Trip.findById(tripId);

    trip?.houses.push(newHouse._id);

    await trip?.save();

    res.status(200).json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const bookTrip = async (req: AuthenticatedRequest, res: Response) => {
  const { id: tripId, houseId } = req.params;
  const { _id: userId } = req.user;

  try {
    const trip = await Trip.findById(tripId);
    const house = await House.findById(houseId);
    const user = await User.findById(userId);

    if (!user || !house || !trip) {
      return res.status(500).json({ error: "Server Error" });
    }

    trip?.guests.push(new mongoose.Types.ObjectId(userId));
    house?.guests.push(new mongoose.Types.ObjectId(userId));
    user?.houses.push(new mongoose.Types.ObjectId(houseId));
    user?.trips.push(new mongoose.Types.ObjectId(tripId));

    await user.save();
    await trip.save();
    await house.save();

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getMyTrips = async (req: AuthenticatedRequest, res: Response) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const userId = req.user._id;

  try {
    const [trips, total] = await Promise.all([
      Trip.find({ guests: { $in: [userId] } })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Trip.countDocuments(),
    ]);

    res.status(200).json({
      currentPage: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      trips,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  createTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
  addHouse,
  bookTrip,
  getMyTrips,
};
