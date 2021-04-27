const Course = require("../models/Course");
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /course/:slug
    show(req, res, next) {
        Course.findOne({slug : req.params.slug})
            .then(course => {
                res.render('courses/show', {course: mongooseToObject(course)});
            })
            .catch(next);
    }
    //[GET] /course/create/(xử lý form, hiển thị form)
    create(req, res,next) {
        res.render('courses/create');
    }
    //[POST] /course/store/(lưu dữu liệu)
    store(req, res,next) {
        const formData = req.body;
        //tạo image bằng videoId (k có image trên form)
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(formData);
        course.save();

        res.redirect('/')
    }
}
module.exports = new CourseController();
