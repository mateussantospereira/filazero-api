import getNextDays from "./getNextDays.js";
import getFirstWeekdayFromWeeks from "./getFirstWeekdayFromWeeks.js";
import splitDay from "./splitDay.js";
import localDate from "./localDate.js";

const availManyWeeks = (weeks, doctor) => {
    let first_day = doctor.first_day;
    const nextDays = getNextDays();
    let today = new Date();
    let { firstDay, positionWeek } = getFirstWeekdayFromWeeks(weeks, first_day);
    let startFirstDay = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth(),
        firstDay.getDate()
    );
    let endToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
    //startFirstDay = localDate(startFirstDay);
    endToday = localDate(endToday);
    let count = positionWeek.positionDay;
    let next = 0;
    let available = [];

    for (
        startFirstDay;
        startFirstDay < nextDays[nextDays.length - 1];
        startFirstDay.setDate(startFirstDay.getDate() + 1)
    ) {
        if (
            weeks[positionWeek.week][positionWeek.positionDay].weekday ==
            startFirstDay.getDay()
        ) {
            if (startFirstDay >= endToday) {
                let split = splitDay(
                    weeks[positionWeek.week][positionWeek.positionDay],
                    startFirstDay,
                    doctor
                );
                available.push(split);
            }

            positionWeek.positionDay++;
            count++;
        }

        // Contadores

        if (positionWeek.positionDay > weeks[positionWeek.week].length - 1) {
            //console.log("------------------------");
            positionWeek.positionDay = 0;
            positionWeek.week++;
        }

        if (positionWeek.week > weeks.length - 1) {
            positionWeek.week = 0;
            positionWeek.positionDay = 0;
        }

        next++;
    }

    return available;
};

export default availManyWeeks;
