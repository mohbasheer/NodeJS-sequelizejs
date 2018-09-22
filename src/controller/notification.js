import NotificationModel from '../models/notification';
import { getStudentsByEmail } from '../services/student';
import { getTeacherByEmail, getStudentByNotCondition } from '../services/teacher';
import { createNotification, setNotificationReceivers, setNotificationSender } from '../services/notification';


export const retrieveForNotifications = async (req, res, next) => {
    if (req.body.teacher === '') {
        return next(new Error('\'student\' param should have values '));
    }
    if (!req.body.teacher) {
        return next(new Error('Missing request param \'teacher\' '));
    }
    if (req.body.notification === '') {
        return next(new Error('\'notification\' param should have values '));
    }
    if (!req.body.notification) {
        return next(new Error('Missing request param \'notification\' '));
    }
    const teacherEmail = req.body.teacher;
    let notification = req.body.notification.split(' ', 1)[0];
    const studentsEmail = req.body.notification.substr(notification.length).split(' @').filter(email => !!email.length)
    try {
        const notification = await createNotification(notification);
        const students = await getStudentsByEmail(studentsEmail);
        const teacher = await getTeacherByEmail(teacherEmail);
        const registeredStudents = await getStudentByNotCondition(teacher, { email: studentsEmail });
        let notifiedStudents = setNotificationReceivers(notification, students.concat(registeredStudents));
        await setNotificationSender(notification, teacher);
        notifiedStudents = await notifiedStudents;
        res.json({
            recipients: notifiedStudents
                .filter(record => !record.suspended)
                .map(record => record.email)
        });
    } catch (error) {
        next(error);
    }
}