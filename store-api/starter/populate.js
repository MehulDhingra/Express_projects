// populateDB.js

const dotenv = require('dotenv');
const connectDB = require('./DB/connect');
const jsonData = require('./products.json'); // Replace with your JSON file path
const ProductModel = require('./models/productModel');

dotenv.config();

const populateDB = async () => {
    try {
        // Connect to MongoDB
        await connectDB(process.env.MONGO_URL);

        // Delete existing data
        await ProductModel.deleteMany();

        // Insert new data
        await ProductModel.create(jsonData);

        console.log('Database populated successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error populating database:', error);
        process.exit(1);
    }
};

populateDB();
