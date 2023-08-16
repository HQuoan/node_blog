const Course = require('../models/Course');


class MeController {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all(([Course.find().lean(), Course.countDocumentsWithDeleted({ deleted: true })]))
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses
                })
            )
            .catch(next);

        // Course.countDocumentsWithDeleted({ deleted: true })
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(() => { });

        // Course.find().lean()
        //     .then(courses => res.render('me/stored-courses', {
        //         courses
        //     }))
        //     .catch(next);

    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true }).lean()
            .then(courses => res.render('me/trash-courses', {
                courses
            }))
            .catch(next);

    }


}

module.exports = new MeController;