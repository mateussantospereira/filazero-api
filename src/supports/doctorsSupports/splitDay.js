import localDate from "./localDate.js";
import timeFormat from "./timeFormat.js";
import divideByTime from "./divideByTime.js";
import isoDateForMinutes from "./isoDateForMinutes.js";

const splitDay = (day, date, doctor) => {
    let duration = doctor.expedients.duration;
    duration = isoDateForMinutes(duration);
    let propriets = ["start", "end", "break", "time_break"];
    day = Object.fromEntries(
        Object.entries(day).filter(([propriet]) => propriets.includes(propriet))
    );
    Object.keys(day).forEach((key) => {
        if (day[key] != null) {
            day[key] = timeFormat(day[key]);
        }
    });
    Object.keys(day).forEach((key) => {
        if (day[key] != null) {
            let hours = day[key];
            let dayDate = new Date(date);
            day[key] = dayDate.setHours(
                hours.horas,
                hours.minutos,
                hours.segundos,
                0
            );
            day[key] = new Date(day[key]);
            day[key] = localDate(day[key]);
        }
    });

    if (day["break"] == null) {
        return divideByTime(day["start"], day["end"], duration);
    }

    let horarios = [];

    if (
        (day["break"].getTime() - day["start"].getTime()) / (1000 * 60) >=
        duration
    ) {
        let antesDoIntervalo = divideByTime(
            day["start"],
            day["break"],
            duration
        );
        horarios = antesDoIntervalo;
    }

    let minutos = isoDateForMinutes(day["time_break"]);
    let depoisDoIntevaloDate = day["break"].setMinutes(
        day["break"].getMinutes() + minutos
    );
    depoisDoIntevaloDate = new Date(depoisDoIntevaloDate);

    let depoisDoIntevalo = divideByTime(
        depoisDoIntevaloDate,
        day["end"],
        duration
    );

    return horarios.concat(depoisDoIntevalo);
};

export default splitDay;
