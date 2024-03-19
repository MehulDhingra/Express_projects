const express = require('express');
const app = express();
const productRoutes = require('./routes/products')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const dotenv = require('dotenv').config()

const connectMiddle = require('./middleware/connectMiddle')

const port = process.env.PORT || 3000;
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>THis is test page</h1>')
});
// app.use(connectMiddle);
app.use('/api/v1/products', productRoutes)
app.use(notFound);
app.use(errorHandler);

const start = () => {
    app.listen(port, () => {
        try {
            console.log(`Server is listening on port ${port}`);

        }
        catch (error) {
            console.log(error);
        }
    });
};

start();
