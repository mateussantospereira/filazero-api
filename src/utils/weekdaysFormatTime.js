import timeToDate from "./timeToDate.js";

const weekdaysFormatTime = (weekdays) => {
    weekdays.forEach((day) => {
        day.start = timeToDate(day.start);
        day.end = timeToDate(day.end);
        day.break = timeToDate(day.break);
        day.time_break = timeToDate(day.time_break);
    });

    return weekdays;
};

export default weekdaysFormatTime;
