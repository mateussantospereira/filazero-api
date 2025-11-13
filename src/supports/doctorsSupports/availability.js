import divideByWeek from "./divideByWeek.js";
import avail from "./avail.js";
import removePastTimes from "./removePastTimes.js";

const availability = (doctor) => {
    let weeks = divideByWeek(doctor.expedients.weekdays);

    let availableDays = avail(weeks, doctor);
    let available = removePastTimes(availableDays);
    return availableDays;
};

export default availability;
