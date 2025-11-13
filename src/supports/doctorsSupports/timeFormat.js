const timeFormat = (date) => {
    date = new Date(date);
    return {
        horas: date.getUTCHours(),
        minutos: date.getMinutes(),
        segundos: date.getSeconds(),
    };
};

export default timeFormat;
