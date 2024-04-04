import UserDao from '../models/dao/user.dao';
import CompanyDao from '../models/dao/company.dao';
import IExtendedRequest from '../types/IExtendedRequest';
import { Response, NextFunction } from 'express';

export const verifyEntityExistance = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const id: number = parseInt(req.id, 10);

  const user = await UserDao.getUserById(id);
  const company = await CompanyDao.getCompanyById(id)
  if (!user && !company) {
    return res.status(404).json({ message: 'Not found' });
  }

  return next();
}

export const verifyUserExistance = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId: number = parseInt(req.id, 10);

  const user = await UserDao.getUserById(userId);
  if (!user) {
    return res.status(404).json({ message: 'Not found' });
  }

  return next();
}

export const verifyCompanyExistance = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const companyId: number = parseInt(req.id, 10);

  const company = await CompanyDao.getCompanyById(companyId);
  if (!company) {
    return res.status(404).json({ message: 'Not found' });
  }

  return next();
}
