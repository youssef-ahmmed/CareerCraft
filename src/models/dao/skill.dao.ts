import prisma from "./client.db";
import SkillDto from "../dto/skill.dto";
import ISkill from "../../types/ISkill";

class SkillDao {
  static async createSkill(skillDto: ISkill) {
    return prisma.skills.create({
      data: skillDto,
    });
  }

  static async getSkillById(skillId: number) {
    return prisma.skills.findUnique({
      where: { id: skillId }
    });
  }

  static async getSkillByName(SkillDto: ISkill) {
    return prisma.skills.findUnique({
      where: { name: SkillDto.name },
    });
  }

  static async getSkillsByUserId(userId: number) {
    return prisma.skills.findMany({
      where: {
        users: {
          some: { userId },
        },
      },
    });
  }

  static async createSkillsByUser(skillsList: string[], userId: number) {
    const createdSkills = [];
    for (const skillName of skillsList) {
      const skillDto = new SkillDto({ name: skillName });
      let skill = await SkillDao.getSkillByName(skillDto);

      if (!skill) {
        skill = await SkillDao.createSkill(skillDto);
      }

      const skilByUser = await SkillDao.getSkillByIdAndUserId(userId, skill.id);
      if (skilByUser) continue;

      const createdSkill = await prisma.skillUser.create({
        data: {
          skillId: skill.id,
          userId: userId
        }
      });

      createdSkills.push({
        id: createdSkill.skillId,
        name: skillName
      });
    }

    return createdSkills;
  }

  static async createSkillsByJob(skillsList: string[], jobId: number) {
    const createdSkills = [];
    for (const skillName of skillsList) {
      const skillDto = new SkillDto({ name: skillName });
      let skill = await SkillDao.getSkillByName(skillDto);

      if (!skill) {
        skill = await SkillDao.createSkill(skillDto);
      }

      const skillByJob = await SkillDao.getSkillByIdAndJobId(jobId, skill.id);
      if (skillByJob) continue;

      const createdSkill = await prisma.skillJob.create({
        data: {
          skillId: skill.id,
          jobId
        }
      });

      createdSkills.push({
        id: createdSkill.skillId,
        name: skillName
      });
    }

    return createdSkills;
  }

  static async getSkillByIdAndUserId(userId: number, skillId: number) {
    return prisma.skillUser.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId
        }
      }
    });
  }

  static async getSkillByIdAndJobId(jobId: number, skillId: number) {
    return prisma.skillJob.findUnique({
      where: {
        jobId_skillId: {
          jobId,
          skillId
        }
      }
    });
  }

  static async deleteSkillByUser(userId: number, skillId: number) {
    return prisma.skillUser.delete({
      where: {
        userId_skillId: {
          userId,
          skillId
        }
      }
    });
  }

  static async deleteSkillByJob(jobId: number, skillId: number) {
    return prisma.skillJob.delete({
      where: {
        jobId_skillId: {
          jobId,
          skillId
        }
      }
    });
  }
}

export default SkillDao;
