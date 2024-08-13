export const timeSince =  (dateString) => {
    if (typeof dateString !== 'string') {
        console.error('dateString must be a string, but got ' + typeof dateString);
        return '';
    }
    let date = new Date(Date.parse(dateString.replace(/-/g, '/')));
    let seconds = Math.floor((new Date() - date) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + "年前";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + "个月前";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + "天前";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + "小时前";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + "分钟前";
    }
    return Math.floor(seconds) + "秒前";
}