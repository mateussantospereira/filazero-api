import definePositionWeek from "./definePositionWeek.js";

const getFirstWeekdayFromWeeks = (weeks, first_day) => {
    let dayFirst = new Date(first_day);
    let firstDay = new Date(first_day);
    let positionWeek = {};
    let findedDay = false;
    let count = 0;

    while (count <= 6) {
        if (weeks[0][count]) {
            if (weeks[0][count].weekday == dayFirst.getDay()) {
                positionWeek = definePositionWeek(0, count);
                //console.log(firstDay); // Primeiro dia
                findedDay = true;
                break;
            }

            if (weeks[0][count].weekday > dayFirst.getDay()) {
                let diasParaAdicionar =
                    weeks[0][count].weekday - dayFirst.getDay();
                firstDay.setDate(firstDay.getDate() + diasParaAdicionar);
                positionWeek = definePositionWeek(0, count);
                //console.log(firstDay); // Primeiro dia
                findedDay = true;
                break;
            }
        }
        count++;
    }

    if (!findedDay) {
        console.log("Dia da semana não está na primeira semana");
        count = 0;

        while (count <= 6) {
            if (weeks[1][count]) {
                let diasParaAdicionar =
                    weeks[1][count].weekday + 7 - dayFirst.getDay();
                firstDay.setDate(firstDay.getDate() + diasParaAdicionar);
                positionWeek = definePositionWeek(1, count);
                //console.log(firstDay); // Primeiro dia
                findedDay = true;
                break;
            }
            count++;
        }
    }

    return { firstDay, positionWeek };
};

export default getFirstWeekdayFromWeeks;
