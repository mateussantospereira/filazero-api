import localDate from "./localDate.js";

const removePastTimes = (available) => {
    let today = new Date();
    today = localDate(today);

    available[0] = available[0].filter((time) => time > today);

    if (available[0].length == 0) available.shift();

    return available;
};

export default removePastTimes;
