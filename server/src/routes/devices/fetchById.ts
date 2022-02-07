import express, { Request, Response } from "express";
import { Device } from "../../models/devices";
import { NotFoundError } from "../../errors/not-found-error";
const router = express.Router();

router.get("/devices/:id", async (req: Request, res: Response) => {
  const response = await Device.findById(req.params.id);
  if (!response) {
    throw new NotFoundError();
  }

  res.json(response);
});

export { router as fetchByIdDeviceRouter };
