import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import IUser from "../types/IUser";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, Number(process.env.SECRET));
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}

export const createToken = (user: IUser) => {
  return jwt.sign({ id: user.id },
    process.env.TOKEN_SECRET,
    { expiresIn: '3d' }
  );
};

export const verifyToken = (req, res, next) => {
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
    req.id = payload.id;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Not a valid token' });
  }
}

