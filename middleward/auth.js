const jwt = require('jsonwebtoken')


function auth(req, res, next) {

    const token = req.header('tocken')
    if (!token) return res.status(401).send('Not valid credintials..')
    try {
        const data = jwt.verify(token, 'jwtsecretkey')
        req.user = data
        next()

    } catch (ex) {
        return res.status(401).send('Not valid credintials..')
    }

}

module.exports = auth