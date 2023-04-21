import express, { Router } from "express";
import {
  createTrip,
  getTrips,
  getTrip,
  deleteTrip,
  updateTrip,
  addHouse,
  bookTrip,
  getMyTrips,
} from "../controllers/tripControllers";
import authMiddleware from "../middleware/requireAuth";

const router: Router = express.Router();

// middleware

//get all recipes
router.get("/", getTrips);

router.get("/mytrips", authMiddleware, getMyTrips);

router.get("/:id", getTrip);

router.post("/", authMiddleware, createTrip);

router.delete("/:id", authMiddleware, deleteTrip);

router.patch("/:id", authMiddleware, updateTrip);

router.post("/:id/houses", authMiddleware, addHouse);

router.post("/:id/houses/:houseId", authMiddleware, bookTrip);

export default router;
