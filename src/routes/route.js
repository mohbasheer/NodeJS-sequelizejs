import express from 'express';
import * as RegisterController from '../controller/teacher_student_register';
import * as StudentController from '../controller/student_controller';
import * as NotificationController from '../controller/notification';

let router = express.Router();

router.get('/commonstudents', RegisterController.getCommonStudents);
router.post('/register', RegisterController.register);
router.post('/suspend', StudentController.supend);
router.post('/retrievefornotifications', NotificationController.retrieveForNotifications);

export default router;
