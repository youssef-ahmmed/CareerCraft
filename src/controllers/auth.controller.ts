import UserDao from "../models/dao/user.dao";
import { comparePassword, createToken } from "../utils/auth";

class AuthController {
  static register = async (req, res) => {
    const { userDto } = req;

    try {
      const user = await UserDao.createUser(userDto);
      const token: string = createToken(user);

      const { password, ...otherAttributes} = user;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static login = async (req, res) => {
    const { userDto } = req;

    try {
      const user = await UserDao.getUserByEmail(userDto);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isValid: boolean = await comparePassword(userDto.password, user.password);
      if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token: string = createToken(user);
      const { password, ...otherAttributes} = user;

      return res.status(201).json({ token, ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default AuthController;
