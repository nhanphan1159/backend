const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/store', meController.storeCourses);
router.get('/trash', meController.trashCourses);

module.exports = router;
