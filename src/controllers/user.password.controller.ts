import UserDao from "../models/dao/user.dao";
import { comparePassword, createEmailToken, hashPassword, verifyJwtToken } from "../utils/auth";
import { Request, Response} from "express";
import { sendEmail } from "../utils/send.email";
import { JwtPayload } from "jsonwebtoken";
import IExtendedRequest from "../types/IExtendedRequest";

class PasswordController {

  /**
   * @desc    send a forget password request
   * @route   /api/v1/users/forget-password
   * @method  POST
   * @access  public
   */
  static forgetPassword = async (req: Request, res: Response) => {
    const email: string = req.body.email;

    try {
      const user = await UserDao.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Email not exist' });
      }

      const secret: string = process.env.TOKEN_SECRET + user.password;
      const token: string = createEmailToken(user, secret);
      const link: string = `${process.env.BASE_URL}/users/reset-password/${user.id}/${token}`;

      await sendEmail(email, link);

      return res.status(201).json({ message: 'Password reset link sent to your email account' });
    } catch (err) {
      if (err.message === 'Error sending email') {
        return res.status(500).json({ message: 'Failed to send email' });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * @desc    reset password request
   * @route   /api/v1/users/reset-password/:userId/:token
   * @method  POST
   * @access  public
   */
  static resetPassword = async (req: Request, res: Response) => {
    const { token, id } = req.params;
    const newPassword = req.body.password;

    try {
      const userId: number = parseInt(id, 10);
      const user = await UserDao.getUserById(userId);
      if (!user) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const secret: string = process.env.TOKEN_SECRET + user.password;
      const decodedToken: JwtPayload = verifyJwtToken(token, secret);

      if (!decodedToken) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await UserDao.updateUserById(userId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Updated Successfully!' });
    } catch(err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * @desc    change password
   * @route   /api/v1/users/change-password/
   * @method  PUT
   * @access  public
   */
  static changePassword = async (req: IExtendedRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const userId: number = parseInt(req.id, 10);

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
