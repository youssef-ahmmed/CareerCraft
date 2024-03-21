import UserDao from '../models/dao/user.dao';
import { Response } from 'express';
import IExtendedRequest from '../types/IExtendedRequest';

class UserController {
  /**
   * @desc    get user by Id or get user profile
   * @route   /api/v1/users/:userId or /api/v1/users/profile 
   * @method  GET
   * @access  private
   */
  static getUserById = async (req: IExtendedRequest, res: Response) => {
    let userId: number;
   
    if (req.params.userId !== 'profile') {
      userId = parseInt(req.params.userId, 10);
    } else {
      userId = parseInt(req.id, 10);
    }

    try {
      const user = await UserDao.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password, ...otherAttributes } = user;

      res.status(200).json({ ...otherAttributes });

    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * @desc    update user profile
   * @route   /api/v1/users
   * @method  PUT
   * @access  private
   */
  static updateUserById = async (req: IExtendedRequest, res: Response) => {
    const userId = parseInt(req.id, 10);
    const { email, firstName, lastName, photo, bio, resumeLink } = req.body;

    const userToBeUpdated = { email, firstName, lastName, photo, bio, resumeLink };

    try {
      const updatedUser = await UserDao.updateUserById(userId, userToBeUpdated);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const { password, ...otherAttributes } = updatedUser;

      return res.status(201).json({ ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * @desc    delete user profile
   * @route   /api/v1/users
   * @method  DELETE
   * @access  private
   */
  static deleteUserById = async (req: IExtendedRequest, res: Response) => {
    const userId = parseInt(req.id, 10);

    try {
      const deletedUser = await UserDao.deleteUserById(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;