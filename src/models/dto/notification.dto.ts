import INotification from "../../types/INotification";

class NotificationDto implements INotification {
  id: number;
  content: string;
  type: string;
  status: boolean;
  userId: number;

  constructor(notificationObject: INotification) {
    this.id = notificationObject.id;
    this.content = notificationObject.content;
    this.type = notificationObject.type;
    this.status = notificationObject.status;
    this.userId = notificationObject.userId;
  }
}

export default NotificationDto;
