import createError from "http-errors";

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') 
    next(createError(401, `Your user does not have access to this dataset`));

    next();
};

export default isAdmin;