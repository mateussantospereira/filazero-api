const divideByTime = (start, end, duration) => {
    let times = [];
    for (
        let horarioAtual = start;
        horarioAtual < end;
        horarioAtual.setMinutes(horarioAtual.getMinutes() + duration)
    ) {
        times.push(new Date(horarioAtual));
    }
    return times;
};

export default divideByTime;
