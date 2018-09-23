export const setNotificationSender = async (notification, teacher) => {
    return await notification.setTeachers([teacher]);
};