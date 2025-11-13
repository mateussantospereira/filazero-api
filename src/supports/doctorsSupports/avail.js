import availUniqueWeek from "./availUniqueWeek.js";
import availManyWeeks from "./availManyWeeks.js";

const avail = (weeks, doctor) => {
    if (weeks.length == 1) {
        return availUniqueWeek(weeks, doctor);
    }

    return availManyWeeks(weeks, doctor);
};

export default avail;
