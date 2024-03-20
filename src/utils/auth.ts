import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, Number(process.env.HASHING_SECRET));
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
