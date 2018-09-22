import StudentModel from '../models/student';

export const getStudentsByEmail = (emails) => StudentModel.findAll({ where: { email: emails } });

export const doSuspend = async (email) => {
    const student = await StudentModel.findOne({ where: { email } });
    if (!student) {
        throw new Error('invalid \'student email\'');
    }
    return await student.update({ suspended: true });
}