const isoDateForMinutes = (isoDateString) => {
    const date = new Date(isoDateString);

    const hours = date.getUTCHours();
    const minutos = date.getUTCMinutes();

    return hours * 60 + minutos;
};

export default isoDateForMinutes;
