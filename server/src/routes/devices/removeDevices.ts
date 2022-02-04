import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Device } from "../../models/devices";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../../middlewares";
import { NotFoundError } from "../../errors/not-found-error";
const router = express.Router();

router.delete(
  "/devices/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const device = await Device.findById(req.params.id);
    if (!device) {
      throw new NotFoundError();
    }
    if (device.isCheckedOut === false) {
      throw new BadRequestError(
        "User currently checked-in through this device"
      );
    }
    device.remove({ _id: req.params.id });
    //   await device.save();
    res.json({ message: "Device deleted successfully" });
  }
);

export { router as removeDeviceRouter };
