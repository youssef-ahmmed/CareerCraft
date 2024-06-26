interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  photo?: string;
  bio?: string;
  resumeLink: string;
}
  
export default IUser;