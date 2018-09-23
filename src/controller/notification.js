import NotificationModel from '../models/notification';
import { getStudentsByEmail } from '../services/student';
import { getTeacherByEmail, getStudentByNotCondition } from '../services/teacher';
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
    let notification = req.body.notification.split(' ', 1)[0];
    const studentsEmail = req.body.notification.substr(notification.length).split(' @').filter(email => !!email.length)
    try {
        const teacher = await getTeacherByEmail(teacherEmail);
        const notification = await createNotification(notification, teacher.employee_id);
        const students = await getStudentsByEmail(studentsEmail);
        const registeredStudents = await getStudentByNotCondition(teacher, { email: studentsEmail });
        const allStudents = students.concat(registeredStudents);
        let notifiedStudentIDs = setNotificationReceivers(notification, allStudents);
        await setNotificationSender(notification, teacher);
        notifiedStudentIDs = await notifiedStudentIDs;
        res.json({
            recipients: allStudents
                .filter(student => notifiedStudentIDs.includes(student.student_id))
                .filter(record => !record.suspended)
                .map(record => record.email)
        });
    } catch (error) {
        next(error);
    }
}