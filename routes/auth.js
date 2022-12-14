const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register',async (req, res)=> {
    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();

        res.status(200).json({
            status : 'success',
            data: user
        });
    } catch (error) {
        res.status(500).json(error);
    }
})
// LOGIN

router.post('/login', async(req, res)=> {
   try {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        res.status(400).json({
            status: 'error',
            message : 'wrong credentials'
        });
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
        res.status(400).json({
            status: 'error',
            message : 'wrong credentials'
        });
    }

    const {password, ...others} = user._doc;

    res.status(200).json({
        status : 'success',
        data: others
    });
   } catch (error) {
    res.status(500).json({
        status : 'error',
        message: error
    });
   }

});


module.exports = router