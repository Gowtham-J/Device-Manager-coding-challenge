import express, { Request, Response, NextFunction } from "express";

import { currentUser } from "../../middlewares/current-user";

const router = express.Router();

// console.log("current user", currentUser);

router.get("/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
