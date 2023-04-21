"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTrips = exports.bookTrip = exports.addHouse = exports.updateTrip = exports.deleteTrip = exports.getTrip = exports.getTrips = exports.createTrip = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const tripModel_1 = __importDefault(require("../models/tripModel"));
const housesModel_1 = __importDefault(require("../models/housesModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
// get all recipes
const getTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [trips, total] = yield Promise.all([
        tripModel_1.default.find({}).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
        tripModel_1.default.countDocuments(),
    ]);
    res.status(200).json({
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        trips,
    });
});
exports.getTrips = getTrips;
//get single recipe
const getTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const trip = yield tripModel_1.default.findById(id).populate("houses");
    if (!trip) {
        return res.status(404).json({ error: "No such trip" });
    }
    return res.status(200).json(trip);
});
exports.getTrip = getTrip;
//create new recipe
const createTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, destination, transport, price, startDate, endDate, image } = req.body;
    const user = req.user;
    try {
        const result = yield cloudinary_1.default.uploader.upload(image, {
            folder: "wycieczki",
            quality: 80,
            width: 500,
            heigth: 500,
        });
        const trip = yield tripModel_1.default.create({
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
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
exports.createTrip = createTrip;
//delete a recipe
const deleteTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const deleteImage = (publicId) => {
        cloudinary_1.default.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.log("Error deleting image from Cloudinary", error);
            }
            else {
                console.log("Image deleted from Cloudinary", result);
            }
        });
    };
    const trip = yield tripModel_1.default.findOneAndDelete({ _id: id });
    if (!trip) {
        return res.status(404).json({ error: "No such trip" });
    }
    // if (recipe.createdBy?.user_id !== _id) {
    //   return res
    //     .status(400)
    //     .json({ error: "Only author can delete his own recipes" });
    // }
    deleteImage((_a = trip.image) === null || _a === void 0 ? void 0 : _a.public_id);
    return res.status(200).json(trip);
});
exports.deleteTrip = deleteTrip;
//edit recipe
const updateTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Id not valid" });
    }
    const trip = yield tripModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!trip) {
        return res.status(404).json({ error: "No such recipe" });
    }
    return res.status(200).json(trip);
});
exports.updateTrip = updateTrip;
// adding a new house
const addHouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: tripId } = req.params;
    const { adress, beds } = req.body;
    try {
        const newHouse = yield housesModel_1.default.create({ adress, beds });
        const trip = yield tripModel_1.default.findById(tripId);
        trip === null || trip === void 0 ? void 0 : trip.houses.push(newHouse._id);
        yield (trip === null || trip === void 0 ? void 0 : trip.save());
        res.status(200).json(trip);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addHouse = addHouse;
const bookTrip = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: tripId, houseId } = req.params;
    const { _id: userId } = req.user;
    try {
        const trip = yield tripModel_1.default.findById(tripId);
        const house = yield housesModel_1.default.findById(houseId);
        const user = yield userModel_1.default.findById(userId);
        if (!user || !house || !trip) {
            return res.status(500).json({ error: "Server Error" });
        }
        trip === null || trip === void 0 ? void 0 : trip.guests.push(new mongoose_1.default.Types.ObjectId(userId));
        house === null || house === void 0 ? void 0 : house.guests.push(new mongoose_1.default.Types.ObjectId(userId));
        user === null || user === void 0 ? void 0 : user.houses.push(new mongoose_1.default.Types.ObjectId(houseId));
        user === null || user === void 0 ? void 0 : user.trips.push(new mongoose_1.default.Types.ObjectId(tripId));
        yield user.save();
        yield trip.save();
        yield house.save();
        res.status(200).json(trip);
    }
    catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.bookTrip = bookTrip;
const getMyTrips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 6 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const userId = req.user._id;
    try {
        const [trips, total] = yield Promise.all([
            tripModel_1.default.find({ guests: { $in: [userId] } })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit)),
            tripModel_1.default.countDocuments(),
        ]);
        res.status(200).json({
            currentPage: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            trips,
        });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getMyTrips = getMyTrips;
