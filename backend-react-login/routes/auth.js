const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../model/User')
const jwt = require("jsonwebtoken")

// Validations
const { registerValidation, loginValidation } = require('../validation')

// User Registration
router.post('/register', async (req, res) => {
    // validating user details
    const { error } = registerValidation(req.body);

    // check if theres any validation error
    if (typeof error !== 'undefined') return res.status(400).send({ errorType: "validation-error", errorMessage: error.details[0].message })

    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // creating a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })

    // checking if a user is already exists in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(404).send({ errorType: "authentication-error", errorMessage: "Email already exists" })

    try {
        // saving the user to the database
        const savedUser = await user.save()
        // send the user details back after user saved to the database
        res.send({
            id: savedUser._id,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            email: savedUser.email
        })
    } catch (err) {
        res.status(404).send({ errorType: "server-error", errorMessage: err })
    }
})

// User Login
router.post('/login', async (req, res) => {
    // validating user details
    const { error } = loginValidation(req.body);

    // check if theres any validation error
    if (typeof error !== 'undefined') return res.status(400).send({ errorType: "validation-error", errorMessage: error.details[0].message })

    // checking if a user exists in the database
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).send({ errorType: "authentication-error", errorMessage: "The email or password you entered is worng" })

    // checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(404).send({ errorType: "authentication-error", errorMessage: "The email or password you entered is worng" })

    // creating a jsonwebtoken
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).send({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        authToken: token
    })

})

module.exports = router