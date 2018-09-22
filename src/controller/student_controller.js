import { doSuspend } from "../services/student";
import { missingParamValue, missingParam } from "../utils/throw_error";


export const supend = async (req, res, next) => {
    const { student } = req.body;
    if (student === '') {
        return next(missingParamValue('student'));
    }
    if (!student) {
        return next(missingParam('student'));
    }
    try {
        await doSuspend(student);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}