import TeacherModel from '../models/teacher';


export const getTeacherByEmail = (email) => TeacherModel.findOne({ where: { email } });

export const getStudents = async (teacher, StudentIDs) => {
    if (StudentIDs && StudentIDs.length > 0) {
        return await teacher.getStudents({ where: { student_id: StudentIDs } });
    }
    return await teacher.getStudents();
}