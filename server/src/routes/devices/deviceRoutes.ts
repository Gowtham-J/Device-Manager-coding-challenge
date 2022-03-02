import express, { Request, Response } from "express";
import { requireAuth, currentUser, validateRequest } from "../../middlewares";
import {
  fetchDevice,
  checkoutUser,
  newDevice,
  removeDevice,
} from "../../controller/deviceController";
import { fetchDeviceById } from "../../controller/deviceController";
import { bodyValidation } from "../../helpers/validations/validation";
import { paginatedResults } from "../../middlewares/paginatedResults";
import { Device } from "../../models/devices";
const router = express.Router();

router.get("/", paginatedResults(Device), fetchDevice);
router.get("/:id", fetchDeviceById);
router.post(
  "/",
  currentUser,
  requireAuth,
  bodyValidation,
  validateRequest,
  newDevice
);
router.put("/checkout/:id", currentUser, requireAuth, checkoutUser);
router.delete("/:id", currentUser, requireAuth, removeDevice);

export { router as deviceRouter };
