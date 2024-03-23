import { Request, Response } from "express";
import JobDto from "../models/dto/job.dto";
import JobDao from "../models/dao/job.dao";

class JobController {

  static createNewJob = async (req: Request, res: Response)=> {
    const jobDto: JobDto = new JobDto(req.body);

    try {
      const job = await JobDao.createJob(jobDto);

      return res.status(201).json(job);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsBySkillsName = async (req: Request, res: Response) => {
    const skills: string[] = req.body.skills;

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
        return res.status(404).json({ message: 'Job not found' });
      }

      return res.status(200).json(job);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static updateSpecificJobById = async (req: Request, res: Response) => {
    const jobId: number = parseInt(req.params.jobId);
    const jobDto: JobDto = new JobDto(req.body);

    try {
      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      const updatedJob = await JobDao.updateJobById(jobId, jobDto);

      return res.status(201).json(updatedJob);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static deleteSpecificJobById = async (req: Request, res: Response) => {
    const jobId: number = parseInt(req.params.jobId);

    try {
      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      await JobDao.deleteJobById(jobId);
      return res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsMatchedUserSkills = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);

    try {
      const jobs = await JobDao.getJobsMatchedUserSkills(userId);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  static getJobsAppliedByUserId = async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId);

    try {
      const jobs = await JobDao.getAppliedJobsByUserId(userId);

      return res.status(200).json(jobs);
    } catch (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default JobController;
