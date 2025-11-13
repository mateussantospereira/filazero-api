import getNextDays from "./getNextDays.js";
import splitDay from "./splitDay.js";

const availUniqueWeek = (weeks, doctor) => {
    const nextDays = getNextDays();
    let available = [];

    for (const day of nextDays) {
        let weekday = weeks[0].find((d) => d.weekday == day.getDay());
        if (weekday) {
            let split = splitDay(weekday, day, doctor);
            available.push(split);
        }
    }

    return available;
};

export default availUniqueWeek;
