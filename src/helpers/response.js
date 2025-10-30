const response = (status, error = null, message = null, data = null) => {
    return {
        status: status,
        error: error,
        message: message,
        data: data,
    };
};

const returnResponse = (res, fields) => {
    return res.status(fields.status).json(fields);
};

export { response, returnResponse };
