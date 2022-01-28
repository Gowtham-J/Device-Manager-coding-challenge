import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Device } from "../../models/devices";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth, currentUser, validateRequest } from "../../middlewares";
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
