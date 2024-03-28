export default function formatDateFunction(dateToFormat) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const WeekDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    const date = new Date(dateToFormat);

    console.log(`${WeekDays[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`);

    return { day: WeekDays[date.getDay()], date: date.getDate(), month: months[date.getMonth()] };
}