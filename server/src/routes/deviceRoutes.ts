import express, { Request, Response } from "express";
import { Device } from "../models/devices";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../middlewares";
import { NotFoundError } from "../errors/not-found-error";
import { fetchDevice, checkoutUser } from "../controller/deviceController";
// import { checkoutUser } from "../controller/deviceController";
const router = express.Router();

router.get("/", fetchDevice);
router.put("/checkout/:id", currentUser, requireAuth, checkoutUser);

export { router as deviceRouter };
