const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { UnAuth } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnAuth(" Not Authorized to access ")
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded;
        req.user = { id, username };
        next();
    } catch (error) {
        throw new UnAuth("User is unauthorized to access this")
    };
}
module.exports = authenticationMiddleware; 
