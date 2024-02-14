import { body } from "express-validator";
import { checkErrors, duplicateValidator } from ".";
import User from "../../models/User.model";

export const validateLogin = [
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email cannot be empty!")
    .isEmail()
    .withMessage("Email is not valid!"),

  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password is required!")
    .trim(),

  checkErrors,
];

// using express validator middleware to check for errors in all fields for user model.
export const validateSignup = [
  body("fullname")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("fullname cannot be empty!")
    .isLength({ min: 3 })
    .withMessage("fullname must have at least 3 characters"),
  body("email")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email cannot be empty!")
    .isEmail()
    .withMessage("Provide a valid email!")
    .custom((value: string) => duplicateValidator(value, "email", User)),
  body("password")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password cannot be empty!")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .trim(),
  checkErrors,
];

export const validateUpdateUser = [
  body("fullname")
    .optional()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("fullname cannot be empty!")
    .isLength({ min: 3 })
    .withMessage("fullname must have at least 3 characters"),

  body("email")
    .optional()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Email cannot be empty!")
    .isEmail()
    .withMessage("Provide a valid email!")
    .custom((value: string) => duplicateValidator(value, "email", User)),

  body("phone")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Provide a valid phone number!")
    .custom((value: string) => duplicateValidator(value, "phone", User)),

  body("password")
    .optional()
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("Password cannot be empty!")
    .isLength({ min: 8 })
    .withMessage("Password must have at least 8 characters")
    .trim(),

  body("location")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Provide a valid location!"),
  checkErrors,
];
