const router = require('express').Router()
const verify = require('../verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        autherizedUserId: req.user,
        posts: {
            title: 'the first post',
            description: 'this is some description about the post'
        }
    })
})

module.exports = router