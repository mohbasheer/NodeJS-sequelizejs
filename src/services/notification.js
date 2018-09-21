import NotificationModel from '../models/notification';

export const createNotification = async (notification) => await NotificationModel.create({ message: notification })

export const setNotificationReceivers = async (notification, students) => {
    const receivers = await notification.setReceiver(students);
    console.log('receivers ', receivers);
    return await receivers;
}

export const setNotificationSender = async (teacher) => {
    const sender = awaitnotification.setSender(teacher);
    console.log('sender ', sender);
    return await sender;
}