import bcrypt from 'bcrypt';
import prisma from './client.db';
import IUser from '../../types/IUsers';

class UsersDao {
  static async createUser(userDto: any) {
    userDto.password = bcrypt.hashSync(userDto.password, Number(process.env.SECRET));
    const user = await prisma.users.create({
      data: userDto,
    });

    return user;
  }

  static async getUserByEmail(userDto: IUser) {
    const user = await prisma.users.findUnique({
      where: {
        email: userDto.email,
      },
    });

    return user;
  }

  static async getUserById(userDto: IUser) {
    const user = await prisma.users.findUnique({
      where: { id: userDto.id },
      include: {
        notifications: true,
        reviews: true,
        skills: true,
        jobs: true,
      },
    });

    return user;
  }

  static async updateUserById(userDto: IUser) {
    const updatedUser = await prisma.users.update({
      where: { id: userDto.id },
      data: userDto,
    });

    return updatedUser;
  }

  static async getUserJobs(userDto: IUser) {
    const user = await UsersDao.getUserById(userDto);
    const userJobs = user.jobs;

    return userJobs;
  }

  static async getUserSkills(userDto: IUser) {
    const user = await UsersDao.getUserById(userDto);
    const userSkills = user.skills;

    return userSkills;
  }

  static async getUserNotifications(userDto: IUser) {
    const user = await UsersDao.getUserById(userDto);
    const userNotifications = user.notifications;

    return userNotifications;
  }
}

export default UsersDao;
