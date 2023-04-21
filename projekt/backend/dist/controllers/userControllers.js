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
exports.signupUser = exports.loginUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createToken = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const savedUser = yield userModel_1.default.login(email, password);
        // create token
        const token = createToken(savedUser._id);
        res.status(200).json({
            username: savedUser.username,
            email: savedUser.email,
            user_id: savedUser._id,
            token,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, username, email, password } = req.body;
    try {
        const savedUser = yield userModel_1.default.signup(firstName, lastName, username, email, password);
        // create token
        const token = createToken(savedUser._id);
        res.status(200).json({
            username: savedUser.username,
            email: savedUser.email,
            user_id: savedUser._id,
            token,
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.signupUser = signupUser;
