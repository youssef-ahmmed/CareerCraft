import CompanyDao from '../models/dao/company.dao';
import { Response } from 'express';
import IExtendedRequest from '../types/IExtendedRequest';

class CompanyController {

  /**
   * @desc    get company by Id or get company profile
   * @route   /api/v1/companies/:companyId or /api/v1/companies/profile 
   * @method  GET
   * @access  private
   */
  static getCompanyById = async (req: IExtendedRequest, res: Response) => {
    let companyId: number;
   
    if (req.params.companyId !== 'profile') {
      companyId = parseInt(req.params.companyId, 10);
    } else {
      companyId = parseInt(req.id, 10);
    }

    try {
      const company = await CompanyDao.getCompanyById(companyId);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const { password, ...otherAttributes } = company;

      res.status(200).json({ ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getJobsByCompanyId = async (req: IExtendedRequest, res: Response) => {
    const companyId: number = parseInt(req.params.companyId);

    try {
      const jobs = await CompanyDao.getJobsByCompanyId(companyId);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

   /**
   * @desc    update company profile
   * @route   /api/v1/companies
   * @method  PUT
   * @access  private
   */
   static updateCompanyById = async (req: IExtendedRequest, res: Response) => {
    const companyId: number = parseInt(req.id, 10);
    const { email, name, industry, location, logo, description, websiteLink } = req.body;

    const companyToBeUpdated = { email, name, industry, location, logo, description, websiteLink };

    try {
      const updatedCompany = await CompanyDao.updateCompanyById(companyId, companyToBeUpdated);
      if (!updatedCompany) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const { password, ...otherAttributes } = updatedCompany;

      return res.status(201).json({ ...otherAttributes });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  /**
   * @desc    delete company profile
   * @route   /api/v1/companies
   * @method  DELETE
   * @access  private
   */
  static deleteCompanyById = async (req: IExtendedRequest, res: Response) => {
    const companyId: number = parseInt(req.id, 10);

    try {
      const deletedCompany = await CompanyDao.deleteCompanyById(companyId);
      if (!deletedCompany) {
        return res.status(404).json({ message: 'Company not found' });
      }

      return res.status(200).json({ message: 'Company deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}

export default CompanyController;
