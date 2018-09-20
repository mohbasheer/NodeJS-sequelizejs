import express from 'express';
import * as RegisterController from '../controller/teacher_student_register';
import * as StudentController from '../controller/student_controller';

let router = express.Router();

router.get('/commonstudents', RegisterController.getCommonStudents);
router.post('/register', RegisterController.register);
router.post('/suspend', StudentController.supend);

export default router;
