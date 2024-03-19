import UserDao from "../models/dao/user.dao";
import { comparePassword, hashPassword } from "../utils/auth";

class PasswordController {
  static changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.id;

    try {
      const user = await UserDao.getUserById(userId);

      const isPasswordCorrect = await comparePassword(currentPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await UserDao.updateUserById(userId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Changed Successfully!' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default PasswordController;
