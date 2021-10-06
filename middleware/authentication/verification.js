import createError from "http-errors";
import User from "../../models/User.js";

const verif = async (req, res, next) => {
    try {
        const token = req.params.token;

        const user = await User.verifyByToken(token);
        if(!user) next( createError(401, `Verification token is corrupt`));

        req.user = user;
        next();
    } catch (error) {
        next( error );
    }
};

export default verif;