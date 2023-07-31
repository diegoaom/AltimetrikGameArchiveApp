const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const formatDate = (str) => {
    let dates = str.split('-');
    let month = MONTHS[parseInt(dates[1]) - 1]
    return `${month} ${dates[2]}, ${dates[0]}`
}