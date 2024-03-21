import UserDto from "../models/dto/user.dto";
import EntityAuthController from "./entity.auth.controller";
import UserDao from "../models/dao/user.dao";

class UserAuthController extends EntityAuthController {
  protected async createEntity(userDto: UserDto): Promise<any> {
    return await UserDao.createUser(userDto);
  }

  protected async getEntityByEmail(email: string): Promise<any> {
    return await UserDao.getUserByEmail(email);
  }

  protected getEntityDto(requestBody: any): UserDto {
    return new UserDto(requestBody);
  }
}

const userAuthController = new UserAuthController();
export default userAuthController;
