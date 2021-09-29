import createError from "http-errors";
import User from "../../models/User.js";

const auth = async (req, res, next) => {
    try {
        console.log("REQ COOKIES -->", req.cookies);
    const token = req.cookies.token;

    const user = await User.findByToken(token);
    if(!user) next( createError(401, `Auth failed. Your cookie seems corrupt.`));

    req.user = user;
    next();
    } catch (error) {
        next( error );
    }
};

export default auth;