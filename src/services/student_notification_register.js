export const setNotificationReceivers = async (notification, students) => {
    const register = await notification.setStudents(students);
    const registeredStudents = register[0] ? register[0].map(record => record.StudentStudentId) : [];
    return registeredStudents;
}