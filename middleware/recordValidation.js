import createError from 'http-errors';

export const isRecordValid = (req, res, next) => {
    try {
        const record = req.body;
        if(!record.title || !record.artist) {
            // // sends an error in the case there is no title or artist upon creation
            // return res.json({ error: "Can not create a record without a title or artist field"});

            const ourError = (new createError(400, "Can not create a record without a title or artist field"));
            throw ourError;
        }

        next();
    } catch (error) {
        next(error);
    }    
}