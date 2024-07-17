const {response} = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        const emailAlreadyExists = await User.findOne({email});
        if (emailAlreadyExists) {
            return res.status(400).json({
                ok: false,
                msg: 'This email is already registered'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        });   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk to the admin'
        });
    }
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const dbUser = await User.findOne({email});
        // validating the email:
        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Problem while searching this user'
            });
        }
        // validating the password:
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Problem while searching this user'
            })
        }
        // generate JWT:
        const token = await generateJWT(dbUser.id);

        res.json({
            ok: true,
            user: dbUser,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'talk to the admin'
        });        
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generateJWT(uid);
    const user = await User.findById(uid);

    res.json({
        ok: true,
        user,
        token
    })
}

module.exports = {
    createUser,
    login,
    renewToken
}