import expect from 'expect';
import initializeDB from '../../../DB';
import NotificaionModel from '../../../src/models/notification';
import RegisterModel from '../../../src/models/student_notification_register';
import { createNotification } from '../../../src/services/notification';
import { setNotificationReceivers } from '../../../src/services/student_notification_register';
import { getStudentsByEmail, getStudentsByIDs } from '../../../src/services/student';
import { getTeacherByEmail } from '../../../src/services/teacher';


describe('Notification Service test', () => {

    before(async () => {
        await initializeDB();
        await RegisterModel.destroy({ where: {}, force: true });
        return await NotificaionModel.destroy({ where: {}, force: true });
    });

    it('validate setNotificationReceivers first notification', async () => {
        const studentsEmail = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const students = await getStudentsByEmail(studentsEmail);
        const notification = await createNotification('Hello first Notification');
        const receiverIDs = await setNotificationReceivers(notification, students);
        const receivers = await getStudentsByIDs(receiverIDs);
        expect(receivers.map(record => record.email)).toEqual(studentsEmail);
    });

    it('validate setNotificationReceivers second notification', async () => {
        const studentsEmail = [
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const students = await getStudentsByEmail(studentsEmail);
        const notification = await createNotification('Hello second Notification');
        const receiverIDs = await setNotificationReceivers(notification, students);
        const receivers = await getStudentsByIDs(receiverIDs);
        expect(receivers.map(record => record.email)).toEqual(studentsEmail);
    });

});
