import { body, param, query, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";

import { User } from "../server.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));

        if (errorMessages[0].startsWith("No job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError("Not authorized to access this file");
        }

        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateQueryInput = withValidationErrors([
  query("symbol").notEmpty().isString().withMessage("symbol is required"),
  query("from_date").notEmpty().isDate().withMessage("from_date is required"),
  query("to_date").notEmpty().isDate().withMessage("to_date is required"),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        throw new BadRequestError("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validatePlaceOrderInput = withValidationErrors([
  body("symbol")
    .notEmpty()
    .withMessage("Symbol is required")
    .isString()
    .withMessage("Symbol must be string"),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt()
    .withMessage("Quantity must be int"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat()
    .withMessage("Price must be float"),
]);
