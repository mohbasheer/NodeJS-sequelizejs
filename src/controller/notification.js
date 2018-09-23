import NotificationModel from '../models/notification';
import { getStudentsByEmail } from '../services/student';
import { getTeacherByEmail, getStudentByNotCondition, getStudentsByTeacher } from '../services/teacher';
import { setNotificationReceivers } from '../services/student_notification_register';
import { createNotification, setNotificationSender } from '../services/notification';
import { missingParam, missingParamValue } from '../utils/throw_error';


export const retrieveForNotifications = async (req, res, next) => {
    if (req.body.teacher === '') {
        return next(missingParamValue('student'));
    }
    if (!req.body.teacher) {
        return next(missingParam('teacher'));
    }
    if (req.body.notification === '') {
        return next(missingParamValue('notification'));
    }
    if (!req.body.notification) {
        return next(missingParam('notification'));
    }
    const teacherEmail = req.body.teacher;
    let notificationMessage = req.body.notification.split(' @', 1)[0];
    const studentsEmail = req.body.notification.substr(notificationMessage.length).split(' @').filter(email => !!email.length)
    try {
        const teacher = await getTeacherByEmail(teacherEmail);
        const notification = await createNotification(notificationMessage, teacher.employee_id);
        const students = await getStudentsByEmail(studentsEmail);
        let registeredStudents;
        if (studentsEmail && studentsEmail.length) {
            registeredStudents = await getStudentByNotCondition(teacher, { email: studentsEmail });
        } else {
            registeredStudents = await getStudentsByTeacher(teacher);
        }
        const allStudents = students.concat(registeredStudents);
        // let notifiedStudentIDs = setNotificationReceivers(notification, allStudents);
        // await setNotificationSender(notification, teacher);
        // notifiedStudentIDs = await notifiedStudentIDs;
        const recipients = allStudents
            .filter(record => !record.suspended)
            .map(record => record.email);
        res.json({ recipients });
    } catch (error) {
        next(error);
    }
}