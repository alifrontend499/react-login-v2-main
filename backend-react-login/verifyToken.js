const jwt = require('jsonwebtoken')

// creating jwt verify middleware function
module.exports = (req, res, next) => {
    // getting token from the header
    const token = req.header('auth-token')

    // if token does not exist in the header
    if (!token) return res.status(401).send('Access Denied')
    try {
        // verifying the token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (err) {
        res.status(400).send('Invalid token')
    }
}