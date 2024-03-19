import UserDto from '../models/dto/user.dto';
import UserValidation from '../validations/user.validation';
import UserDao from '../models/dao/user.dao';

const validateUser = (validationFunction: Function, UserDtoClass) => async (req, res, next) => {
  const userDto = new UserDtoClass(req.body);
  const error = validationFunction(req.body);

  if (error && error.error && error.error.details && error.error.details[0]) {
    return res.status(400).json({ message: error.error.details[0].message });
  }

  req.userDto = userDto;
  return next();
};

export const validateEmailExistence = async (req, res, next) => {
  const { userDto } = req;

  try {
    const user = await UserDao.getUserByEmail(userDto);
    if (user) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const validateRegisterUser = validateUser(UserValidation.createUser, UserDto);

export const validateLoginUser = validateUser(UserValidation.login, UserDto);
