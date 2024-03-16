import prisma from "./client.db";
import ICompany from "../../types/ICompany";
import bcrypt from 'bcrypt';

class CompanyDao {
  static async createCompany(companyDto: any) {
    companyDto.password = bcrypt.hashSync(companyDto.password, Number(process.env.SECRET));
    return prisma.companies.create({
      data: companyDto,
    });
  }

  static async getCompanyByEmail(companyDto: ICompany) {
    return prisma.companies.findUnique({
      where: {email: companyDto.email},
    });
  }

  static async getCompanyById(companyDto: ICompany) {
    return prisma.companies.findUnique({
      where: {id: companyDto.id},
    });
  }

  static async updateCompanyById(companyDto: any) {
    return prisma.companies.update({
      where: {id: companyDto.id},
      data: companyDto,
    });
  }

  static async deleteCompanyById(companyDto: ICompany) {
    return prisma.companies.delete({
      where: {id: companyDto.id},
    });
  }
}

export default CompanyDao;
