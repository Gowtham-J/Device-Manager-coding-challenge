import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";

const router = express.Router();

router.post(
  "/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("firstName").not().isEmpty().withMessage("First name is required"),
    body("lastName").not().isEmpty().withMessage("Last name is required"),
    body("number").not().isEmpty().withMessage("Contact number is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, firstName, lastName, number } = req.body;

    // looking for existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password, firstName, lastName, number });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };
