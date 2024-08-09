class ServiceResult {
    constructor(dataObj) {
        this.message = dataObj.message
        this.data = dataObj.data
        this.statusCode = dataObj.statusCode
    }

    ok() {
        return {
            isSuccess: true,
            statusCode: 200,
            data: this.data,
            message: this.message,
            errorMessage: ''
        }
    }

    failure() {
        return {
            isSuccess: false,
            statusCode: this.statusCode,
            data: this.data,
            errorMessage: this.message
        }
    }


}


module.exports.ServiceResult = ServiceResult