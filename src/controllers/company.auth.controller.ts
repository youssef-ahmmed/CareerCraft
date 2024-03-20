import CompanyDao from '../models/dao/company.dao';
import CompanyDto from '../models/dto/company.dto';
import { comparePassword, createToken } from "../utils/auth";
import { Request, Response } from 'express';

class CompanyAuthController {

   /**
   * @desc register
   * @route /api/v1/companies/signup
   * @method POST
   * @access public
   */
  static register = async(req: Request, res: Response) => {
    const companyDto = new CompanyDto(req.body);
    
    try {
      const company = await CompanyDao.createCompany(companyDto);
      const token: string = createToken(company.id);

      const { password, ...otherAttributes } = company;

      return res.status(201).json({ token, ...otherAttributes });
    } catch(err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

   /**
   * @desc login
   * @route /api/v1/companies/login
   * @method POST
   * @access public
   */
  static login = async(req: Request, res: Response) => {
    try {
      const { email, password: requestBodyPassword } = req.body;

      const company = await CompanyDao.getCompanyByEmail(email);
      if (!company) {
        return res.status(401).json({ message: 'Invalid email or password'});
      }

      const isValidPassword: boolean = await comparePassword(requestBodyPassword, company.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid email or password'});
      }

      const token: string = createToken(company.id);
      const { password: companyPassword, ...otherAttributes } = company;
      return res.status(201).json({ token, ...otherAttributes });

    } catch(err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default CompanyAuthController;
