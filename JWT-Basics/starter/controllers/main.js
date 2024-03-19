const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new CustomAPIError('Please fill in all details', 404);
    }

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
    console.log(username, password);
    res.status(200).json({ msg: 'User logged in', token });
};

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data. Your lucky number is ${luckyNumber}` });
};

module.exports = {
    login,
    dashboard
};