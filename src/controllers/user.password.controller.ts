import PasswordController from './password.controller'
import UserDao from "../models/dao/user.dao";


class UserPasswordController extends PasswordController {
  protected async getEntityByEmail(email: string) {
    return await UserDao.getUserByEmail(email);
  }

  protected async getEntityById(id: number) {
    return await UserDao.getUserById(id);
  }

  protected async updateEntityById(id: number, update: any) {
    await UserDao.updateUserById(id, update);
  }

  protected getEntityType(): string {
    return 'users';
  }
}

const userPasswordController = new UserPasswordController();
export default userPasswordController;
