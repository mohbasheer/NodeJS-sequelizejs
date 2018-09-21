import NotificationModel from '../models/notification';
import { getStudentsByEmail } from '../services/student';
import { getTeacherByEmail, getStudentByNotCondition } from '../services/teacher';
import { createNotification, setNotificationReceivers, setNotificationSender } from '../services/notification';


export const retrieveForNotifications = async (req, res, next) => {
    const { teacher } = req.body;
    let { notification } = req.body;
    const studentsEmail = '';
    const teacherEmail = '';
    try {
        const notification = await createNotification(notification);
        //create notification
        const students = await getStudentsByEmail(studentsEmail);
        const teacher = await getTeacherByEmail(teacherEmail);
        const registeredStudents = await getStudentByNotCondition(teacher, { email: studentsEmail });
        const operationResult = await Promise.all([
            setNotificationReceivers(students.concat(registeredStudents)),
            setNotificationSender(teacher)
        ]
        );
        const { 0: notifiedStudents } = operationResult;
        res.json({ recipients: notifiedStudents });
        //notification addStudents
        // notification addTeacher
    } catch (error) {
        next(error);
    }
}