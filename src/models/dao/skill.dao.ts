import prisma from "./client.db";
import SkillDto from "../dto/skill.dto";
import ISkill from "../../types/ISkill";

class SkillDao {
  static async createSkill(skillDto: any) {
    return prisma.skills.create({
      data: skillDto,
    });
  }

  static async getSkillByName(SkillDto: ISkill) {
    return prisma.skills.findUnique({
      where: { name: SkillDto.name },
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

      const createdSkill = await prisma.skillUser.create({
        data: {
          skillId: skill.id,
          userId: userId
        }
      });

      createdSkills.push(createdSkill);
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

      const createdSkill = await prisma.skillJob.create({
        data: {
          skillId: skill.id,
          jobId
        }
      });

      createdSkills.push(createdSkill);
    }

    return createdSkills;
  }
}

export default SkillDao;
