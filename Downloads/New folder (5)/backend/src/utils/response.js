const success = (data, message = 'Success', statusCode = 200) => {
    return {
        success: true,
        message,
        data,
        statusCode,
    };
};

const error = (message = 'Error', statusCode = 500) => {
    return {
        success: false,
        message,
        statusCode,
    };
};

module.exports = {
    success,
    error,
};
