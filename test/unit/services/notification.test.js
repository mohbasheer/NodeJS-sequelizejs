import expect from 'expect';
import initializeDB from '../../../DB';
import NotificaionModel from '../../../src/models/notification';
import { setNotificationReceivers, createNotification, setNotificationSender } from '../../../src/services/notification';
import { getStudentsByEmail } from '../../../src/services/student';
import { getTeacherByEmail } from '../../../src/services/teacher';


describe.only('Notification Service test', () => {

    before(() => initializeDB());

    beforeEach(() => NotificaionModel.destroy({ where: {}, force: true }));

    it('get all students by email', async () => {
        const studentsEmail = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const notificaion = await createNotification('hello hi');
        const students = await getStudentsByEmail(studentsEmail);
        const teacher = await getTeacherByEmail('teacheraa@gmail.com');
        const receivers = await setNotificationReceivers(notificaion, students);
        const sender = await setNotificationSender(teacher, notificaion);
        expect(receivers.map(record => record.email)).toEqual(studentsEmail);
        expect(sender.employee_id).toBe(teacher.employee_id);
    });

});
