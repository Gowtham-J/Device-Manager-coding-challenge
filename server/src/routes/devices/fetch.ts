import express from "express";
import { Device } from "../../models/devices";
import { dateValidation } from "../../helpers/daysValidation";

const router = express.Router();

router.get("/devices", async (req, res) => {
  // fetching all the device that exists
  await Device.find().then(async (respond) => {
    await dateValidation(respond, Device);
    res.send(respond);
  });
});

export { router as fetchDeviceRouter };
