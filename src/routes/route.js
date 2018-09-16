import express from 'express';
import * as RegisterController from '../controller/teacher_student_register';

let router = express.Router();

router.get('/commonstudents', RegisterController.getCommonStudents);

export default router;
