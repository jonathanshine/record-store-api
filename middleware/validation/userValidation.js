import { body, validationResult } from "express-validator";
import createError from "http-errors";

export const userValidationRules = () => {
    return [
        body("email")
            .isEmail()
            .withMessage("Not a valid email address.")
            .trim()
            .normalizeEmail(),
        body("password")
            .isStrongPassword({
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage(`Password must be at least 8 characters long and contain at least 1 of each of the following characters: lowercase letter, uppercase, letter, number, symbol. `)
    ];
};

export const userValidationErrorHandling = (req, res, next) => {
    const errors = validationResult(req);
    console.log("valid res -->", errors);
    if (!errors.isEmpty()) return next();

    const arrErrors = errors.array();
    const errorsSummary = mergeErrors(arrErrors);
    const err = new createError(422, errorsSummary);

    next(err);
};

const mergeErrors = arrErrors => {
    return arrErrors.map(err => `${err.msg}`).join(` `);
};