const express = require('express');
const router = express.Router();
const {addStudent, getStudents} = require('../controllers/studentController');
const authMiddleware = require('../middleware/userMiddleware');

router.post('/student', authMiddleware, addStudent);
router.get('/student', authMiddleware, getStudents);

module.exports = router;