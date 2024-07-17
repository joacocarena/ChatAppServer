const {Router} = require('express');
const { createUser, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], createUser);

router.post('/', [
    check('email', 'Wrong credentials').isEmail(),
    check('password', 'Wrong credentials').not().isEmpty(),
    validateFields
], login);

router.get('/renew', validateJWT, renewToken);

module.exports = router;