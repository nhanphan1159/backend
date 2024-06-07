const Course = require('../models/Course');
const {
    mutipleMongooseToObject,
    mongoosesToObject,
} = require('../../util/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then
                // ((course) => {
                // res.send(course);
                // }),
            ((course) => {
                res.render('courses/show', {
                    course: mongoosesToObject(course),
                });
            }).catch(next);
    }
    create(req, res, next) {
        Course(res)
            .save()
            .then((course) => {
                res.send({ message: 'ok', status: 200, data: course });
            });
    }

    store(req, res, next) {
        req.body.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then((course) =>
                res.send({ message: 'ok', status: 200, data: course }),
            )
            .catch((err) => {
                console.log(err);
            });
    }
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => res.send({ message: 'ok', status: 200 }))
            .catch(next);
    }

    update(req, res, next) {
        req.body.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
        // var _id = req.params.id;
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(res.send({ status: 200, mesage: 'ok' }))
            .catch(next);
    }

    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(res.send({ status: 200, mesage: 'ok' }))
            .catch(next);
    }

    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(res.send({ status: 200, mesage: 'ok' }))
            .catch(next);
    }

    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(res.send({ status: 200, mesage: 'ok' }))
            .catch(next);
    }

    handleFormActions(req, res, next) {
        switch (req.body.actions) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new CourseController();
