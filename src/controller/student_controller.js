import { doSuspend } from "../services/student";


export const supend = async (req, res, next) => {
    const { student } = req.body;
    if (student === '') {
        return next(new Error('\'student\' param should have values '));
    }
    if (!student) {
        return next(new Error('Missing request param \'student\' '));
    }
    try {
        await doSuspend(student);
        res.status(204).json();
    } catch (error) {
        next(error);
    }
}