import { Request } from "express";
interface IGetUserAuthInfoRequest extends Request {
  user: any; // or any other type
}

export { IGetUserAuthInfoRequest };
