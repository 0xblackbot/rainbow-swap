export const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isCurrentYear = date.getFullYear() === now.getFullYear();

    const time = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(date);

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric'
    };

    if (!isCurrentYear) {
        dateOptions.year = 'numeric';
    }

    const datePart = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

    return `${time}, ${datePart}`;
};
