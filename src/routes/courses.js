const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.put('/:id', courseController.update);
router.patch('/restore/:id', courseController.restore);
router.delete('/delete/:id', courseController.destroy);
router.delete('/force/:id', courseController.force);

router.get('/show/:slug', courseController.show);

module.exports = router;
