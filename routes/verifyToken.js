const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    console.log(req.headers);
    const token = req.headers.auth-token.split(' ')[1];
    
    if(!token) {
        return res.status(401).send('Access denied.');
    }

    try {
        const verified = jwt.verify(token, "privatekey");
        req.user = verified;
        console.log(verified);
        next();
    } 
    catch (err) {
        console.log(err);
        return res.status(400).send('Invalid token');
    }
}