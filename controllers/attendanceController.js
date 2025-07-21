const db = require('../config/db');


//mark attendance
exports.markAttendance = (req, res) => {
    const { student_id, date, status} = req.body;

    db.query(
        'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
        [student_id, date, status],
        (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY'){
                    return res.status(409).send('Attendance already marked.');
                }
                return res.status(500).send(err);
            }

            res.send('Attendance marked');
        }
    )
}


//Get attendance by student
exports.getAttendanceByStudent = (req, res) => {
    const studentId = req.params.student_id;

    db.query(
        'SELECT * FROM attendance WHERE student_id = ?',
        [studentId],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};


//Get attendance summary by date
exports.getSummaryByDate = (req, res) => {
    const date = req.params.date;

    db.query(
        `SELECT s.name, s.class_name, a.status
        FROM attendance a
        JOIN students s ON a.student_id = s.id
        WHERE a.date = ?`,
        [date],
        (err, results) => {
            if (err) return res.status(500).send(err);
            res.json(results);
        }
    );
};