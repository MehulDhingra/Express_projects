const errorHandlerMiddleware = require('../../final/middleware/error-handler')
const { CustomAPIError } = require('../errors/custom-errors')

const CustomErrorHandler = (err,req,res,next)=>{

    if(err instanceof CustomAPIError){
        return res.send(err.statuscode).json({msg : err.message})
    }
    return res.send(500).json("some error has occured")
}

module.exports = CustomErrorHandler