import IUser from "../../types/IUser";

class UserDto implements IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  bio?: string;
  resumeLink: string;

  constructor(userObject: IUser) {
    this.email = userObject.email;
    this.password = userObject.password;
    this.firstName = userObject.firstName;
    this.lastName = userObject.lastName;
    this.photo = userObject.photo;
    this.bio = userObject.bio;
    this.resumeLink = userObject.resumeLink;
  }
}

export default UserDto;
