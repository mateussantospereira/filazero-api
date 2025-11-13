const localDate = (date) => {
    let offSetLocal = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offSetLocal);

    return date;
};

export default localDate;
