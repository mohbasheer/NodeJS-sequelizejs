'use strict';

const seedData = require('../config/seed-data.json');

const getData = (data) => data.map((email) => {
    const date = new Date();
    return { email, createdAt: date, updatedAt: date };
});

const getStudentData = () => getData(seedData.students);
const getTeachersData = () => getData(seedData.teachers);

console.log('jfadjfjagjkg')

module.exports = {
    getStudentData,
    getTeachersData,
};