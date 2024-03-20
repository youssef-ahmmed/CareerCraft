import CompanyDao from "../models/dao/company.dao";
import { Request, Response } from "express";
import { 
  hashPassword,
  createEmailToken,
  verifyJwtToken,
  comparePassword
} from "../utils/auth";
import { sendEmail } from "../utils/send.email";
import { JwtPayload } from "jsonwebtoken";
import IExtendedRequest from "../types/IExtendedRequest";

class PasswordController {

  /**
   * @desc    send a forget password request
   * @route   /api/v1/companies/forget-password
   * @method  POST
   * @access  public
   */
  static forgetPassword = async (req: Request, res: Response) => {
    const companyEmail: string = req.body.email;

    try {
      const company = await CompanyDao.getCompanyByEmail(companyEmail);
      if (!company) {
        return res.status(400).json({ message: 'Email not exist' });
      }

      const secret: string = process.env.TOKEN_SECRET + company.password;
      const token: string = createEmailToken(company, secret);
      const link: string = `${process.env.BASE_URL}/companies/reset-password/${company.id}/${token}`;

      await sendEmail(companyEmail, link);

      return res.status(201).json({ message: 'Password reset link sent to your email account' });


    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * @desc    reset password request
   * @route   /api/v1/companies/reset-password/:id/:token
   * @method  POST
   * @access  private
   */
  static resetPassword = async (req: Request, res: Response) => {
    const { token, id } = req.params;
    const newPassword = req.body.password;

    try {
      const companyId: number = parseInt(id, 10);
      const company = await CompanyDao.getCompanyById(companyId);
      if (!company) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const secret: string = process.env.TOKEN_SECRET + company.password;
      const decodedToken: JwtPayload = verifyJwtToken(token, secret);

      if (!decodedToken) {
        return res.status(400).json({ message: 'Invalid link or expired' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await CompanyDao.updateCompanyById(companyId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Updated Successfully!' });
    } catch(err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  /**
   * @desc    change password
   * @route   /api/v1/companies/change-password/
   * @method  PUT
   * @access  private
   */
  static changePassword = async (req: IExtendedRequest, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    const companyId: number = parseInt(req.id, 10);

    try {
      const company = await CompanyDao.getCompanyById(companyId);

      const isPasswordCorrect = await comparePassword(currentPassword, company.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Incorrect current password' });
      }

      const hashedPassword: string = await hashPassword(newPassword);
      await CompanyDao.updateCompanyById(companyId, { password: hashedPassword });

      return res.status(201).json({ message: 'Password Changed Successfully!' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default PasswordController;
