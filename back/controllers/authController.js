const User = require('../db/models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, "chillguy", {
        expiresIn: '2d',
    });
}

const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ where: { username } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (error) {
        ;
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username, password } });

        if (user) {
            const { password, ...userWithoutPassword } = user.dataValues;
            const token = generateToken(userWithoutPassword);
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        next(error);
    }
}


const checkToken = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, message: 'Token not provided' });
    }

    try {
        const decoded = jwt.decode(token);

        if (decoded && (decoded.username || decoded.email)) {
            return res.status(200).json({ valid: true });
        } else {
            return res.status(400).json({ valid: false, message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(400).json({ valid: false, message: 'Error decoding token' });
    }
};


const getUserId = async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, message: 'Token not provided' });
    }

    try {
        const decoded = jwt.decode(token);
        const user = await User.findOne({ where: { username: decoded.username } });
        if (decoded && (decoded.username || decoded.email)) {
            return res.status(200).json({ userId: user.id });
        } else {
            return res.status(400).json({ valid: false, message: 'Invalid token' });
        }
    } catch (error) {
        return res.status(400).json({valid: false, message: 'Error'});
    }
}

module.exports = {
    register,
    login,
    checkToken,
    getUserId,
};

