import { invalidParam } from "../utils/throw_error";

/**
 * Minimum email validation
 * 
 * 
 * @param {*} email 
 */
const validateEmail = email => {
    if (!email)
        return false;

    const hasValidAt = email.indexOf('@') > 4, //abcef@
        hasDotAfterAt = email.split('@')[1] && email.split('@')[1].includes('.');

    if (!hasValidAt && !hasDotAfterAt) {
        throw invalidParam('Email!');
    }
}

export default validateEmail;