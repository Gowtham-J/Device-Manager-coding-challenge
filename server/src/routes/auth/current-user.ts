import express, { Request, Response, NextFunction } from "express";
import { currentUser } from "../../middlewares/current-user";
import jwt from "jsonwebtoken";
import { IGetUserAuthInfoRequest } from "../../helpers/definitionFIle";

const router = express.Router();

router.get("/users/currentuser", currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
