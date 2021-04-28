const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res) {
        res.render('me/stored-courses');
    }
}
module.exports = new MeController();
