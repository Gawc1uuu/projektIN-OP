"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripControllers_1 = require("../controllers/tripControllers");
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const router = express_1.default.Router();
// middleware
//get all recipes
router.get("/", tripControllers_1.getTrips);
router.get("/mytrips", requireAuth_1.default, tripControllers_1.getMyTrips);
router.get("/:id", tripControllers_1.getTrip);
router.post("/", requireAuth_1.default, tripControllers_1.createTrip);
router.delete("/:id", requireAuth_1.default, tripControllers_1.deleteTrip);
router.patch("/:id", requireAuth_1.default, tripControllers_1.updateTrip);
router.post("/:id/houses", requireAuth_1.default, tripControllers_1.addHouse);
router.post("/:id/houses/:houseId", requireAuth_1.default, tripControllers_1.bookTrip);
exports.default = router;
