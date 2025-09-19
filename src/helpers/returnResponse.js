const returnResponse = (res, fields) => {
    return res.status(fields.status).json(fields);
};

module.exports = returnResponse;
