import createError from 'http-errors';

export const isRecordValid = (req, res, next) => {
  try {
    const record = req.body;
    if (!record.title || !record.artist) {
      let ourError = new createError(
        400,
        `Can not create a record without a title or a artist field`
      );
      throw ourError;
    }

    next();
  } catch (error) {
    next(error);
  }
};