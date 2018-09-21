import NotificationModel from '../models/notification';

export const createNotification = async (notification) => await NotificationModel.create({ message: notification })

export const setNotificationReceivers = async (notification, students) => {
    await notification.setReceiver(students);
    return await notification.getReceiver();
}

export const setNotificationSender = async (teacher, notification) => {
    await notification.setSender(teacher);
    return await (await notification.getSender())[0];
}