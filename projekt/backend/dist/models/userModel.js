"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    trips: [{ type: mongoose_1.Types.ObjectId, ref: "Trip" }],
    houses: [{ type: mongoose_1.Types.ObjectId, ref: "House" }],
});
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw Error("email and password are required");
        }
        if (!validator_1.default.isEmail(email)) {
            throw Error("Incorrect email");
        }
        const user = yield this.findOne({ email });
        if (!user) {
            throw Error("user with that email do not exists");
        }
        const match = yield bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        else {
            throw Error("incorrect password");
        }
    });
};
userSchema.statics.signup = function (firstName, lastName, username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password || !username || !firstName || !lastName) {
            throw Error("All fields are required");
        }
        const exists = yield this.findOne({ email });
        if (exists) {
            throw Error("User with that email already exists");
        }
        const isUsedUsername = yield this.findOne({ username });
        if (isUsedUsername) {
            throw Error("Username is already taken");
        }
        if (!validator_1.default.isEmail(email)) {
            throw Error("Incorrect email");
        }
        if (!validator_1.default.isStrongPassword(password)) {
            throw Error("Password not strong enough");
        }
        const salt = yield bcrypt.genSalt(10);
        const hash = yield bcrypt.hash(password, salt);
        const user = this.create({
            firstName,
            lastName,
            username,
            email,
            password: hash,
        });
        return user;
    });
};
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
