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
const mongoose_1 = require("mongoose");
const housesModel_1 = __importDefault(require("./housesModel"));
const tripSchema = new mongoose_1.Schema({
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
    guests: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    houses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "House" }],
}, { timestamps: true });
tripSchema.post("findOneAndDelete", (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield housesModel_1.default.deleteMany({ trip: doc._id });
}));
const Trip = (0, mongoose_1.model)("Trip", tripSchema);
exports.default = Trip;
