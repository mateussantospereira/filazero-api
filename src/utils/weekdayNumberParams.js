const weekdayNumberParams = (params) => {
    Object.keys(params).forEach((key) => {
        params[key] = Number(params[key]);
    });

    return params;
};

export default weekdayNumberParams;
