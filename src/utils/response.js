const response = (res, status, message = null, data = null) => {
    return res.status(status).json({
        error: status >= 400,
        message: message,
        data: data,
    });
};

export default response;
