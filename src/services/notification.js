import NotificationModel from '../models/notification';

export const createNotification = async (notification, teacherID) => {
    let columns = { message: notification };
    if (teacherID) {
        columns.senderEmployeeId = teacherID;
    }
    return await NotificationModel.create(columns);
};

export const setNotificationSender = async (notification, teacher) => {
    return await notification.setSender(teacher);
};