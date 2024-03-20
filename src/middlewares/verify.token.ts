import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const verifyToken = (
  req: Request,
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
    const payload = jwt.verify(token, process.env.TOKEN_SECRET) as JwtPayload;
    // req.id = payload.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not a valid token' });
  }
}
