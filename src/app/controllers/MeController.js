const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses,deletedCount])=>
                res.render('me/stored-courses',{
                    deletedCount,
                    courses: mutipleMongooseToObject(courses)
                })
        ) 
            .catch(next);
    }

//lấy ra số lượng đã xóa
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => {
                
        //     });
//lấy dữ liệu ra
    //     Course.find({})
    //         .then(courses => res.render('me/stored-courses',{
    //             courses: mutipleMongooseToObject(courses)
    //         }))
    //         .catch(next);
    // }
    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses',{
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}
module.exports = new MeController();
