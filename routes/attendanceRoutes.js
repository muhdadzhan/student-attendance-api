const express = require('express');
const router = express.Router();

const {
    markAttendance,
    getAttendanceByStudent,
    getSummaryByDate
} = require('../controllers/attendanceController');


const authMiddleware = require('../middleware/userMiddleware');


router.post('/attendance', authMiddleware, markAttendance);
router.get('/attendance/:student_id', authMiddleware, getAttendanceByStudent);
router.get('/summary/date/:date', authMiddleware, getSummaryByDate);


module.exports = router;