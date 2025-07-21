const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(403).send('Token required');

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    }
    catch (err){
        return res.status(401).send('Invalid token');
    }
};