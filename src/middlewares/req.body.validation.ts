import { Request, Response, NextFunction } from "express";

export const validateReqBody = (validationFunction: Function) => async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {

  const error = validationFunction(req.body);

  if (error && error.error && error.error.details && error.error.details[0]) {
    return res.status(400).json({ message: error.error.details[0].message });
  }

  return next();
};

export const validateEmailExistence = (getByEmail: Function) => async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {

  const email = req.body.email;

  try {
    const user = await getByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
