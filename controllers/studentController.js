const db = require('../config/db');

exports.addStudent = (req, res) => {
    const {name, class_name} = req.body;

    db.query('INSERT INTO students SET ?', {name, class_name}, (err) => {
        if (err) return res.status(500).send(err);
        res.send('Students Added');
    })

    // if (!name || !class) {
    //     return res.status(400).send('Data is missing');
    // }

    // db.query(
    //     'INSERT INTO students (name, class) VALUES (?, ?)',
    //     [name, class],
    //     (err, result) => {
    //         if (err) return res.status(500).send(err);
    //         res.send('Student added');
    //     }
    // );
};

exports.getStudents = (req,res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};