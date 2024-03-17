import prisma from "./client.db";
import INotification from "../../types/INotification";

class NotificationDao {
  static async createNotification(notificationDto: any) {
    return prisma.notifications.create({
      data: notificationDto,
    });
  }

  static async getNotificationsByUserId(userId: number) {
    return prisma.notifications.findMany({
      where: { userId }
    });
  }

  static async deleteCompanyById(notificationId: number) {
    return prisma.notifications.delete({
      where: {
        id: notificationId,
      }
    });
  }
}

export default NotificationDao;
