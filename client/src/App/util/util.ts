export function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

export function minimizeTitle(title: string) {
    const acceptableLength = 20;
    if (title.length >= acceptableLength) {
        return title.slice(0, acceptableLength) + "...";
    } else {
        return title;
    }
}