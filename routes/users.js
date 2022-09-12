const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


router.put('/:id',async (req, res)=> {
    try {

        const id = req.params.id;
        if (id) {
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({
                    status: 'error', 
                    message : 'User not found'
                });
            }
        } 

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true});

        res.status(200).json({
            status : 'success',
            data: updatedUser
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/:id',async (req, res)=> {
    try {
        const id = req.params.id;
        if (id) {
            const user = await User.findById(id);
            if (!user) {
                res.status(404).json({
                    status: 'error', 
                    message : 'User not found'
                });
            }
        } 

        await User.findByIdAndDelete(id);


        res.status(200).json({
            status : 'success',
            message: 'User deleted'
        });
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router