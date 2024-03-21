import EntityAuthController from "./entity.auth.controller";
import CompanyDto from "../models/dto/company.dto";
import CompanyDao from "../models/dao/company.dao";

class CompanyAuthController extends EntityAuthController {
  protected async createEntity(companyDto: CompanyDto): Promise<any> {
    return await CompanyDao.createCompany(companyDto);
  }

  protected async getEntityByEmail(email: string): Promise<any> {
    return await CompanyDao.getCompanyByEmail(email);
  }

  protected getEntityDto(requestBody: any): CompanyDto {
    return new CompanyDto(requestBody);
  }
}

const companyAuthController = new CompanyAuthController();
export default companyAuthController;
