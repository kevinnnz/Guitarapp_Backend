const admin = require('../auth/firebase-admin')

decodeFireBaseToken = async (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(400).json({
            error: {
                message : 'You did not specify any token for this request.'
            }
        })
    }

    try {
        req.authToken = req.headers.authorization.split(' ')[1]
        const userPayload = await admin.auth().verifyIdToken(req.authToken)
        req.user = userPayload
        next()
    } catch (err) {
        return res.status(500).json({
            err
        })
    }
}

isAuthenticated = async (req, res, next) => {
    if(req.user) {
        next()
    } else {
        return res.status(401).json({
            error: 'You are not authorised to preform this action.'
        })
    }
}

module.exports = {
    isAuthenticated,
    decodeFireBaseToken
}