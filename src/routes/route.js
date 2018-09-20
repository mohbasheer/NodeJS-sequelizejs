import express from 'express';
import * as RegisterController from '../controller/teacher_student_register';

let router = express.Router();

router.get('/commonstudents', RegisterController.getCommonStudents);
router.post('/register', RegisterController.register);

export default router;
