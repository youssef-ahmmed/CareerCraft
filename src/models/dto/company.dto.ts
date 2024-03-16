import ICompany from "../../types/ICompany";

class CompanyDto implements ICompany {
  id: number;
  email: string;
  password: string;
  name: string;
  industry: string;
  location: string;
  logo: string;
  description: string;
  websiteLink: string;

  constructor(companyObject: ICompany) {
    this.id = companyObject.id;
    this.email = companyObject.email;
    this.password = companyObject.password;
    this.name = companyObject.name;
    this.industry = companyObject.industry;
    this.location = companyObject.location;
    this.logo = companyObject.logo;
    this.description = companyObject.description;
    this.websiteLink = companyObject.websiteLink;
  }
}

export default CompanyDto;
