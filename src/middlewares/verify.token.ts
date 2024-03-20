import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../utils/auth";
import IExtendedRequest from "../types/IExtendedRequest";

export const verifyToken = (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
  ) => {

  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'There is no token' });
  }

  try {
    const payload = verifyJwtToken(token, process.env.TOKEN_SECRET);
    req.id = payload.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not a valid token' });
  }
};
