import localDate from "./localDate";

const differenceInDays = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    date1 = localDate(date1);
    date2 = localDate(date2);
    console.log(date1, " - ", date2);

    let diferencaEmMs = date1.getTime() - date2.getTime();
    let msPorDia = 1000 * 60 * 60 * 24;
    let difference = diferencaEmMs / msPorDia;

    return difference;
};

export default differenceInDays;
