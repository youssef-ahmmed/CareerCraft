import prisma from './client.db';
import {hashPassword} from "../../utils/auth";
import IUser from '../../types/IUser';

class UserDao {
  static async createUser(userDto: IUser) {
    userDto.password = await hashPassword(userDto.password);
    return prisma.users.create({
      data: userDto,
    });
  }

  static async applyUserForJob(userId: number, jobId: number) {
    return prisma.jobUser.create({
      data: {
        userId,
        jobId
      }
    });
  }

  static async getUserByEmail(userEmail: string) {
    return prisma.users.findUnique({
      where: { email: userEmail },
    });
  }

  static async getUserById(userId: number) {
    return prisma.users.findUnique({
      where: { id: userId },
      include: {
        notifications: true,
        reviews: true,
        skills: true,
        jobs: true,
      },
    });
  }

  static async deleteUserById(userId: number) {
    return prisma.users.delete({
      where: { id: userId }
    });
  }

  static async updateUserById(userId: number, updatedUserObject: object) {
    return prisma.users.update({
      where: { id: userId },
      data: updatedUserObject,
    });
  }

  static async getUserJobs(userId: number) {
    const user = await UserDao.getUserById(userId);
    return user.jobs;
  }

  static async getUserSkills(userId: number) {
    const user = await UserDao.getUserById(userId);
    return user.skills;
  }

  static async getUserNotifications(userId: number) {
    const user = await UserDao.getUserById(userId);
    return user.notifications;
  }
}

export default UserDao;
