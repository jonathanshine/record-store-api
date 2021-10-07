import createError from "http-errors";

const isUserVerified = (req, res, next) => {
    if (!req.user.verified.status) next(createError(401, `To be able to place orders, you must verify your email address`));

    next();
};

export default isUserVerified;