import TeacherModel from '../models/teacher';
import { Op } from 'sequelize';
import { invalidParam } from '../utils/throw_error';


export const getTeacherByEmail = async (email) => {
    const teacher = await TeacherModel.findOne({ where: { email } });
    if (!teacher) {
        throw invalidParam('teacher');
    }
    return teacher;
};

export const getStudentsByTeacher = async (teacher, StudentIDs) => {
    if (StudentIDs && StudentIDs.length > 0) {
        return await teacher.getStudents({ where: { student_id: StudentIDs } });
    }
    return await teacher.getStudents();
}

export const getStudentByNotCondition = async (teacher, notConfig) => {
    return await teacher.getStudents({
        where: {
            [Op.not]: [
                notConfig
            ]
        }
    });
}