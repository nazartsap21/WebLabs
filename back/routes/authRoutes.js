const express = require('express');
const authControllers = require('../controllers/authController');
const router = express.Router();


router.route('/register').post(authControllers.register);
router.route('/login').post(authControllers.login);
router.route('/checkToken').post(authControllers.checkToken);

module.exports = router;