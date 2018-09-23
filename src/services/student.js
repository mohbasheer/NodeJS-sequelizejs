import StudentModel from '../models/student';

export const getStudentsByEmail = (emails) => StudentModel.findAll({ where: { email: emails } });

export const getStudentsByIDs = (IDs) => StudentModel.findAll({ where: { student_id: IDs } });

export const getStudentByEmail = async (email) => {
    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        throw new Error('invalid \'student email\'');
    }
    return student;
}

export const doSuspend = async (email) => {
    const student = await getStudentByEmail(email);
    return student.update({ suspended: true });
};

export const cancelSuspend = async (email) => {
    const student = await getStudentByEmail(email);
    return student.update({ suspended: false });
};