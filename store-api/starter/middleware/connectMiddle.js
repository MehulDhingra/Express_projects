const connectDB = require('../DB/connect'); // Import the database connection function

const connectMiddle = async (req, res, next) => {
    try {
        await connectDB(process.env.MONGO_URL); // Connect to the database
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database connection error' });
    }
}

module.exports = connectMiddle;
