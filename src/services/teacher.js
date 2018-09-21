import TeacherModel from '../models/teacher';


export const getTeacherByEmail = (email) => TeacherModel.findOne({ where: { email } });

export const getStudents = async (teacher, StudentIDs) => {
    if (StudentIDs && StudentIDs.length > 0) {
        return await teacher.getStudents({ where: { student_id: StudentIDs } });
    }
    return await teacher.getStudents();
}

export const getStudentByNotCondition = async (teacher, notConfig) => {
    return await teacher.getStudents({
        where: {
            [Op.not]: [
                // { id: [1,2,3] }
                notConfig
            ]
        }
    });
}