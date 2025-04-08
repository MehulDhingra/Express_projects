const CustomAPIError = require("./custom-error");
const {StatusCodes} = require('http-status-codes')

class UnAuth extends CustomAPIError {
    constructor(message){
        super(messgae)
        this.statusCode = StatusCodes.UNAUTHORIZED

    }
}

module.exports = UnAuth