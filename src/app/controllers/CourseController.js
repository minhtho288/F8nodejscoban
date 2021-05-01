const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /course/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    //[GET] /course/create/(xử lý form, hiển thị form)
    create(req, res, next) {
        res.render('courses/create');
    }
    //[POST] /course/store/(lưu dữu liệu)
    store(req, res, next) {
        //tạo image bằng videoId (k có image trên form)
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save();

        res.redirect('/me/stored/courses');
    }
    //[GET] /course/:id/eidt
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                    course:mongooseToObject(course),
                }))
            .catch(next);
    }
    //[PUT] /courses/:id
    update(req, res, next) {
        // res.json(req.body);
        Course.updateOne({ _id: req.params.id }, req.body)
        .then(()=> res.redirect('/me/stored/courses'))
        .catch(next);
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[DELETE] /courses/:id/force
    forceDestroy(req,res,next){
        Course.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req,res,next){
        Course.restore({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
    }
}
module.exports = new CourseController();
