import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

import IUser from "../types/IUser";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, Number(process.env.SECRET));
}

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}

export const createToken = (id: number) => {
  return jwt.sign({ id },
    process.env.TOKEN_SECRET,
    { expiresIn: '3d' }
  );
};
