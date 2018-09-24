import expect from 'expect';
import initializeDB from '../../../DB';
import NotificaionModel from '../../../src/models/notification';
import { createNotification, setNotificationSender } from '../../../src/services/notification';
import { getStudentsByEmail } from '../../../src/services/student';
import { getTeacherByEmail } from '../../../src/services/teacher';


describe('Notification Service test', () => {

    before(() => initializeDB());

    beforeEach(() => NotificaionModel.destroy({ where: {}, force: true }));

    it('validate notification sender and receiver', async () => {
        const studentsEmail = [
            "student11@gmail.com",
            "student22@gmail.com",
            "student33@gmail.com"
        ];
        const teacher = await getTeacherByEmail('teacheraa@gmail.com');
        const notificaion = await createNotification('hello hi', teacher.employee_id);
        const students = await getStudentsByEmail(studentsEmail);
        expect(notificaion.senderEmployeeId).toBe(teacher.employee_id);
    });

});
