const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//add new user
exports.register = (req, res) => {
    const {name, email, password, role} = req.body;
    const hash = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO users SET ?', {name, email, password: hash, role}, (err) => {
        if (err) return res.status(500).send(err);
        res.send('User Registered');
    });
};


//login
exports.login = (req, res) => {
    const {email, password} = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0 ) return res.status(401).send('Invalid email');
        
        const user = results[0];
        const match = bcrypt.compareSync(password, user.password); //password = user input

        if (!match) return res.status(401).send('Wrong Password');

        const token = jwt.sign({ id: user.id, role: user.role}, 'secretkey', { expiresIn: '1d'});
        
        res.json({ 
            message: 'Login Successful',
            token: token,
            role: user.role,
            userId: user.id,
            name: user.name
         });
    });
};