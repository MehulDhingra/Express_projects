const productModel = require("../models/productModel");
const connectDB = require('../DB/connect');
const { query } = require("express");

const dotenv = require('dotenv').config()

const getAllProductsStatic = async (req, res) => {
    console.log("Hello, getAllProductsStatic just got pinged");
    try {
        const result = await productModel.find({
        })
        res.status(200).json({
            products: result, nbHits: result.length,
        });
    }
    catch (error) {
        console.log(error);
    }
};

const getAllProducts = async (req, res) => {
    try {
        const { featured, company, name, sort, fields, numericFilters, price } = req.query;
        const queryObject = {};
        if (name)
            queryObject.name = { $regex: name, $options: 'i' };
        if (company)
            queryObject.company = company;
        if (featured)
            queryObject.featured = featured;

        if (numericFilters) {
            const operatorMap = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };
            const regEx = /\b(<|>|>=|=|<|<=)\b/g;
            let filters = numericFilters.replace(
                regEx,
                (match) => `-${operatorMap[match]}-`
            );
            console.log(filters);
            const options = ['price', 'rating'];
            filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if (options.includes(field)) {
                    queryObject[field] = { [operator]: Number(value) };
                }
            });
        }
        let result = productModel.find(queryObject)
        
        if (sort) {
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }
        if (fields) {
            const fieldList = fields.split(',').join(' ')
            result = result.select(fieldList)
        }
        
        console.log(queryObject);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10

        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);

        console.log(numericFilters);

        const results = await result
        res.status(200).json({ result: results, nbHits: results.length });
    }
    catch (error) {
        console.log(error);
    };
}

module.exports = { getAllProducts, getAllProductsStatic };

