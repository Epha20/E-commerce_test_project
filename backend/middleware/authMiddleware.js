const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) 
        return res.status(401).json({error: 'Access denied'})
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decode.userId;
        next();
    } catch(err){
        res.status(401).json({error: 'Invalid token'})
    }
}

module.exports = verifyToken