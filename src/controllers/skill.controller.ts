import JobDao from '../models/dao/job.dao';
import SkillDao from '../models/dao/skill.dao';
import UserDao from '../models/dao/user.dao';
import IExtendedRequest from '../types/IExtendedRequest';
import { Response } from 'express';

class SkillController {
  static creatSkillsByUser = async (req: IExtendedRequest, res: Response) => {
    try {
      const skillsList: string[] = req.body.skills;
      const userId: number = parseInt(req.id, 10);

      const createdSkills = await SkillDao.createSkillsByUser(skillsList, userId);
      if (createdSkills.length === 0) {
        return res.status(200).json({ message: 'All provided skills are already related to the user' });
      }

      return res.status(201).json(createdSkills);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static getSkillsByUserId = async (req: IExtendedRequest, res: Response) => {
    try {
      const userId: number = parseInt(req.params.userId, 10);
      const user = await UserDao.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Not found' });
      }

      const skills = await SkillDao.getSkillsByUserId(userId);
      return res.status(200).json(skills);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static deleteSkillByUser = async (req: IExtendedRequest, res: Response) => {
    const userId: number = parseInt(req.id, 10);
    const skillId: number = parseInt(req.params.skillId);

    try {
      const skillById = await SkillDao.getSkillById(skillId);
      if (!skillById) {
        return res.status(404).json({ message: 'Not found' });
      }

      const skillByIdAndUserId = await SkillDao.getSkillByIdAndUserId(userId, skillId);
      if (!skillByIdAndUserId) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      await SkillDao.deleteSkillByUser(userId, skillId);
      return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static creatSkillsByJob = async (req: IExtendedRequest, res: Response) => {
    try {
      const skillsList: string[] = req.body.skills;
      const jobId: number = parseInt(req.params.jobId, 10);
      const companyId: number = parseInt(req.id);

      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Not found' });
      }
      if (companyId !== job.companyId) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      const createdSkills = await SkillDao.createSkillsByJob(skillsList, jobId);
      if (createdSkills.length === 0) {
        return res.status(200).json({ message: 'All provided skills are already related to the job' });
      }

      return res.status(201).json(createdSkills);
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static deleteSkillByJob = async (req: IExtendedRequest, res: Response) => {
    const jobId: number = parseInt(req.params.jobId, 10);
    const skillId: number = parseInt(req.params.skillId);
    const companyId: number = parseInt(req.id);

    try {
      const job = await JobDao.getJobById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Not found' });
      }
      if (companyId !== job.companyId) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      const skillById = await SkillDao.getSkillById(skillId);
      if (!skillById) {
        return res.status(404).json({ message: 'Not found' });
      }

      const skillByIdAndjobId = await SkillDao.getSkillByIdAndJobId(jobId, skillId);
      if (!skillByIdAndjobId) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      await SkillDao.deleteSkillByJob(jobId, skillId);
      return res.status(200).json({ message: 'Skill deleted successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default SkillController;
