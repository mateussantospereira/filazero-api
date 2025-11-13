import localDate from "./localDate.js";

const getNextDays = () => {
    let days = [];
    const hoje = new Date();
    for (let day = 0; day < 15; day++) {
        let setDay = new Date(hoje);
        setDay.setDate(hoje.getDate() + day);
        setDay = localDate(setDay);
        days.push(setDay);
    }
    return days;
};

export default getNextDays;
