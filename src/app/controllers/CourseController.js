const Course = require('../models/Course');
const {
  mutipleMongooseToObject,
  mongoosesToObject,
} = require('../../util/mongoose');

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render('courses/show', { course: mongoosesToObject(course) });
      })
      .catch(next);
  }
  create(req, res, next) {
    res.render('courses/create');
  }

  store(req, res, next) {
    // res.json(req.body)

    // formData.slug = formData.name;
    req.body.img = `https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect('/me/courses/store'))
      .catch((err) => {
        console.log(err);
      });
  }
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render('courses/edit', { course: mongoosesToObject(course) }),
      )
      .catch(next);
  }

  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/store/courses'))
      .catch(next);
  }

  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  force(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }

  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new CourseController();
