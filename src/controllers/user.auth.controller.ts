import UserDao from "../models/dao/user.dao";
import { comparePassword, createToken } from "../utils/auth";
import UserDto from "../models/dto/user.dto";
import { Request, Response } from "express";

class UserAuthController {
  static register = async (req: Request, res: Response) => {
    const userDto = new UserDto(req.body);

    try {
      const user = await UserDao.createUser(userDto);
      const token: string = createToken(user.id);

      const { password, ...otherAttributes} = user;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static login = async (req: Request, res: Response) => {
    const userDto = new UserDto(req.body);

    try {
      const user = await UserDao.getUserByEmail(userDto.email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isValid: boolean = await comparePassword(userDto.password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token: string = createToken(user.id);
      const { password, ...otherAttributes} = user;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default UserAuthController;
