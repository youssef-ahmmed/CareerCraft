import UserDto from "../models/dto/user.dto";
import UserValidation from "../validations/user.validation";

export const changePasswordValidator = async (req, res, next) => {
  const error = UserValidation.changePassword(req.body);

  if (error && error.error && error.error.details && error.error.details[0]) {
    return res.status(400).json({ message: error.error.details[0].message });
  }

  return next();
};
