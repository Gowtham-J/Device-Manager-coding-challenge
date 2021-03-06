import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  number: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

// authorization from the bearer token in header

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next();
  }
  try {
    const token = authHeader.split(" ")[1];
    const payLoad = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payLoad;
  } catch (error) {
    console.log(error);
  }
  next();
};
