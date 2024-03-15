import prisma from './client.db';
import IJob from "../../types/IJob";

class JobDao {
  static async createJob(jobDto: any) {
    return prisma.jobs.create({
      data: jobDto,
    });
  }

  static async applyUserForJob(userId: number, jobId: number) {
    return prisma.jobUser.create({
      data: {
        userId,
        jobId
      }
    });
  }

  static async updateJobById(jobDto: any) {
    return prisma.jobs.update({
      where: { id: jobDto.id },
      data: jobDto,
    });
  }

  static async getJobById(jobDto: IJob) {
    return prisma.jobs.findUnique({
     where: { id: jobDto.id },
    });
  }

  static async getJobsMatchedUserSkills(userId: number) {
    const userSkills = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        skills: {
          select: {
            userId: true,
            skillId: true,
          }
        }
      }
    });

    const skillsList = userSkills.skills;
    const skillsIds = skillsList.map(userSkill => userSkill.skillId);

    return prisma.jobs.findMany({
      where: {
        skills: {
          some: {
            skillId: {
              in: skillsIds,
            }
          }
        }
      },
      include: {
        company: true,
      }
    });
  }

  static async getAppliedJobsByUserId(userId: number) {
    return prisma.jobs.findMany({
      where: {
        users: {
          some: {
            userId: {
              equals: userId,
            }
          }
        }
      },
      include: {
        company: true
      }
    });
  }

  static async getJobsBySkillsNames(skillNames: string[]) {
    const skillIdsObject = await prisma.skills.findMany({
      select: {
        id: true,
      },
      where: {
        name: {
          in: skillNames,
        }
      }
    });

    const skillIds = skillIdsObject.map(skill => skill.id);

    return prisma.jobs.findMany({
      where: {
        skills: {
          some: {
            skillId: {
              in: skillIds,
            }
          }
        }
      }
    });
  }

  static async getJobsByCompanyId(companyId: number) {
    return prisma.jobs.findMany({
      where: {
        companyId: {
          equals: companyId,
        }
      }
    });
  }
}

export default JobDao;
