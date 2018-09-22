
export const missingParam = (param) => new Error(`Missing request param '${param}'`);

export const missingParamValue = (param) => new Error(`'${param}' param should have values '`);

export const invalidParam = (param) => new Error(`invalid '${param}'`);