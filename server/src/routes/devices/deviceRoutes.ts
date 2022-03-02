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
const router = express.Router();

router.get("/", fetchDevice);
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
