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

    const currentDate = new Date();
    const month = dateToFormat.slice(6, 7);
    let day = dateToFormat.slice(8, 10) - currentDate.getDate() + currentDate.getDay();
    if (day >= 7) day = day - 7;
    
    return { day: WeekDays[day], date: dateToFormat.slice(8, 10), month: months[month] };
}