import PasswordController from "./password.controller";
import CompanyDao from '../models/dao/company.dao';

class CompanyPasswordController extends PasswordController {
  protected async getEntityByEmail(email: string) {
    return await CompanyDao.getCompanyByEmail(email);
  }

  protected async getEntityById(id: number) {
    return await CompanyDao.getCompanyById(id);
  }

  protected async updateEntityById(id: number, update: any) {
    await CompanyDao.updateCompanyById(id, update);
  }

  protected getEntityType(): string {
    return 'companies';
  }
}

const companyPasswordController = new CompanyPasswordController();
export default companyPasswordController;
