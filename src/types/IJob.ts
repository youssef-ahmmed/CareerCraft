interface IJob {
  title: string;
  description: string;
  location: string;
  type: string;
  salary: number;
  status: boolean;
  applicationLink: string;
  applicantNumbers: number;
  notificationId?: number;
  companyId: number;
}

export default IJob;
