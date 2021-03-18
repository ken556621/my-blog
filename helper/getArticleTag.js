export const getPath = (content) => {
    const titleRole = new RegExp("<p>tags:.+?</p>");

    if (!titleRole) {
        return ""
    }

    const path = content.match(titleRole)[0].replace("<p>tags:", "").replace("</p>", "").toLowerCase();

    return path
};

export const getTitle = content => {
    const titleRole = new RegExp("<h1>.+?</h1>");

    if (!titleRole) {
        return ""
    }

    const title = content.match(titleRole)[0].replace("<h1>", "").replace("</h1>", "");

    return title
};

export const getDate = content => {
    const dateRole = new RegExp("<p>date:.+?</p>");

    if (!dateRole) {
        return ""
    }

    const date = content.match(dateRole)[0].replace("<p>date:", "").replace("</p>", "");

    return date
}