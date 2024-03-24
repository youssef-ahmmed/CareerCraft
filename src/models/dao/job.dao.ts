import prisma from './client.db';

class JobDao {
  static async createJob(jobDto: any) {
    return prisma.jobs.create({
      data: jobDto,
    });
  }

  static async updateJobById(jobId: number, updatedJobObject: object) {
    return prisma.jobs.update({
      where: { id: jobId },
      data: updatedJobObject,
    });
  }

  static async getJobById(jobId: number) {
    return prisma.jobs.findUnique({
     where: { id: jobId },
    });
  }

  static async deleteJobById(jobId: number) {
    return prisma.jobs.delete({
      where: { id: jobId }
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
    const skillsIds: number[] = skillsList.map(userSkill => userSkill.skillId);

    return prisma.jobs.findMany({
      where: {
        skills: {
          some: {
            skillId: {
              in: skillsIds,
            }
          }
        }
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

    const skillIds: number[] = skillIdsObject.map(skill => skill.id);

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

  static async getJobByNotificationId(notificationId: number) {
    return prisma.jobs.findUnique({
      where: { notificationId }
    });
  }
}

export default JobDao;
