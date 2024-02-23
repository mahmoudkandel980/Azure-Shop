function convertTimestampFun(timestamp: string) {
    let time;

    const currentDate = new Date().getTime();
    const modifiedTimestamp = new Date(timestamp).getTime();
    const different = (currentDate - modifiedTimestamp) / 1000;

    const timeInSeconds = +different.toFixed(0);
    const timeInMinutes = +(different / 60).toFixed(0);
    const timeInHours = +(different / (60 * 60)).toFixed(0);
    const timeInDays = +(different / (60 * 60 * 24)).toFixed(0);
    const timeInWeek = +(different / (60 * 60 * 24 * 7)).toFixed(0);

    if (timeInSeconds === 0) {
        time = `Now`;
        return time;
    } else if (timeInSeconds < 59) {
        time = `${timeInSeconds} ${
            timeInSeconds === 1 ? "Second ago" : "Seconds ago"
        }`;
        return time;
    } else if (timeInMinutes <= 59) {
        time = `${timeInMinutes} ${
            timeInMinutes === 1 ? "Minute ago" : "Minutes ago"
        }`;
        return time;
    } else if (timeInHours <= 23) {
        time = `${timeInHours} ${timeInHours === 1 ? "Hour ago" : "Hours ago"}`;
        return time;
    } else if (timeInDays <= 6) {
        time = `${timeInDays} ${timeInDays === 1 ? "Day ago" : "Days ago"}`;
        return time;
    } else {
        time = `${timeInWeek} ${timeInWeek === 1 ? "Week ago" : "Weeks ago"}`;
        return time;
    }
}

export default convertTimestampFun;
