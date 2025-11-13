const divideByWeek = (weekdays) => {
    let numWeeks = weekdays.reduce((numWeeks, weekday) => {
        if (!numWeeks.includes(weekday.week)) {
            numWeeks.push(weekday.week);
        }
        return numWeeks;
    }, []);
    numWeeks = numWeeks.sort((a, b) => a - b);
    let weeks = [];
    for (const week of numWeeks) {
        let days = weekdays.filter((weekday) => weekday.week == week);
        weeks.push(days);
    }
    return weeks;
};

export default divideByWeek;
