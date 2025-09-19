const response = (status, error = null, message = null, data = null) => {
    return {
        status: status,
        error: error,
        message: message,
        data: data,
    };
};

module.exports = response;
