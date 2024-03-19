import bcrypt from 'bcrypt';

import prisma from './client.db';
import IUser from '../../types/IUser';

class UserDao {
  static async createUser(userDto: any) {
    userDto.password = bcrypt.hashSync(userDto.password, Number(process.env.SECRET));
    return prisma.users.create({
      data: userDto,
    });
  }

  static async getUserByEmail(userDto: IUser) {
    return prisma.users.findUnique({
      where: {
        email: userDto.email,
      },
    });
  }

  static async getUserById(userDto: IUser) {
    return prisma.users.findUnique({
      where: {id: userDto.id},
      include: {
        notifications: true,
        reviews: true,
        skills: true,
        jobs: true,
      },
    });
  }

  static async updateUserById(userDto: IUser) {
  static async deleteUserById(userId: number) {
    return prisma.users.delete({
      where: { id: userId }
    });
  }

    return prisma.users.update({
      where: {id: userDto.id},
      data: userDto,
    });
  }

  static async getUserJobs(userDto: IUser) {
    const user = await UserDao.getUserById(userDto);
    return user.jobs;
  }

  static async getUserSkills(userDto: IUser) {
    const user = await UserDao.getUserById(userDto);
    return user.skills;
  }

  static async getUserNotifications(userDto: IUser) {
    const user = await UserDao.getUserById(userDto);
    return user.notifications;
  }
}

export default UserDao;
