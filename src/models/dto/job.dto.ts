import IJob from "../../types/IJob";

class JobDto implements IJob {
  id: number;
  title: string;
  description: string;
  location: string;
  type: string;
  salary: number;
  status: boolean;
  applicationLink: string;
  applicantNumbers: number;
  companyId: number;
  notificationId?: number;

  constructor(jobObject: IJob) {
    this.id = jobObject.id;
    this.title = jobObject.title;
    this.description = jobObject.description;
    this.location = jobObject.location;
    this.type = jobObject.type;
    this.salary = jobObject.salary;
    this.status = jobObject.status;
    this.applicationLink = jobObject.applicationLink;
    this.applicantNumbers = jobObject.applicantNumbers;
    this.companyId = jobObject.companyId;
    this.notificationId = jobObject.notificationId;
  }
}

export default JobDto;
