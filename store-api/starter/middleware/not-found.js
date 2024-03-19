const notFound = async (req, res, next, err) => {
    console.log(err);
    res.status(400).json({ msg: "bad request" });
}
module.exports = notFound;