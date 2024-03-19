const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong....." })
}

module.exports = errorHandlerMiddleware