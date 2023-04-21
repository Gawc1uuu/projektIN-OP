"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
const tripRoutes_1 = __importDefault(require("./routes/tripRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
// for socket io
const http_1 = __importDefault(require("http"));
//middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
//routes
app.use("/api/trips", tripRoutes_1.default);
app.use("/api/user", userRoutes_1.default);
app.get("*", (req, res) => {
    res.status(404).json({ msg: "Not found" });
});
// socket io
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
// connecting to db
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/wycieczki")
    .then(() => server.listen(4000, () => {
    console.log("Conntected to database and listening on port 4000");
}))
    .catch((e) => {
    console.log(e.message);
});
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("addComment", (data) => {
        socket.emit("newComment", data);
    });
    socket.on("deleteComment", (data) => {
        socket.emit("deletedComment", data);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});
