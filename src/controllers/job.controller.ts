import { Request, Response } from "express";
import JobDto from "../models/dto/job.dto";
import JobDao from "../models/dao/job.dao";
import IExtendedRequest from "../types/IExtendedRequest";
import SkillDao from "../models/dao/skill.dao";

class JobController {

  static createNewJob = async (req: IExtendedRequest, res: Response) => {
    const jobDto: JobDto = new JobDto(req.body);
    const companyId: number = parseInt(req.id);
    const skillsNames = req.body.skills;

    try {
      const job = await JobDao.createJob({ ...jobDto, companyId });
      const skills = await SkillDao.createSkillsByJob(skillsNames, job.id);

      return res.status(201).json({ ...job, skills });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsBySkillsName = async (req: IExtendedRequest, res: Response) => {
    const { skills } = req;

    try {
      const jobs = await JobDao.getJobsBySkillsNames(skills);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getSpecificJobById = async (req: Request, res: Response) => {
    const { jobId } = req.params;

    try {
      const job = await JobDao.getJobById(parseInt(jobId));

      if (!job) {
        return res.status(404).json({ message: 'Not found' });
      }

      return res.status(200).json(job);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static updateSpecificJobById = async (req: IExtendedRequest, res: Response) => {
    const jobId: number = parseInt(req.params.jobId, 10);
    const jobDto: JobDto = new JobDto(req.body);
    const companyId: number = parseInt(req.id, 10);

    try {
      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (companyId !== job.companyId) {
        return res.status(403).json({ message: 'Permission Denied' });
      }

      const updatedJob = await JobDao.updateJobById(jobId, jobDto);

      return res.status(201).json(updatedJob);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static deleteSpecificJobById = async (req: IExtendedRequest, res: Response) => {
    const jobId: number = parseInt(req.params.jobId, 10);
    const companyId: number = parseInt(req.id, 10);

    try {
      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Not found' });
      }

      if (companyId !== job.companyId) {
        return res.status(403).json({ message: 'Permission Denied' });
      }

      await JobDao.deleteJobById(jobId);
      return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsMatchedUserSkills = async (req: IExtendedRequest, res: Response) => {
    const userId: number = parseInt(req.id, 10);

    try {
      const jobs = await JobDao.getJobsMatchedUserSkills(userId);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsAppliedByUserId = async (req: IExtendedRequest, res: Response) => {
    try {
      const userId: number = parseInt(req.id, 10);
      const jobs = await JobDao.getAppliedJobsByUserId(userId);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default JobController;
