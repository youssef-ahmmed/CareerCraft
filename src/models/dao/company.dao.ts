import prisma from "./client.db";
import ICompany from "../../types/ICompany";
import { hashPassword } from "../../utils/auth";

class CompanyDao {
  static async createCompany(companyDto: ICompany) {
    companyDto.password = await hashPassword(companyDto.password);
    return prisma.companies.create({
      data: companyDto,
    });
  }

  static async getCompanyByEmail(companyEmail: string) {
    return prisma.companies.findUnique({
      where: {email: companyEmail},
    });
  }

  static async getCompanyById(companyId: number) {
    return prisma.companies.findUnique({
      where: {id: companyId},
    });
  }

  static async updateCompanyById(comapanyId: number, updatedObject: object) {
    return prisma.companies.update({
      where: {id: comapanyId},
      data: updatedObject,
    });
  }

  static async deleteCompanyById(companyId: number) {
    return prisma.companies.delete({
      where: {id: companyId},
    });
  }
}

export default CompanyDao;
