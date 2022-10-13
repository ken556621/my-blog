export const getPath = content => {
  const titleRole = new RegExp("<p>tags:.+?</p>");

  if (!titleRole) {
    return "";
  }

  const path = content
    .match(titleRole)?.[0]
    .replace("<p>tags:", "")
    .replace("</p>", "")
    .toLowerCase();

  return path;
};

export const getTitle = content => {
  const titleRole = new RegExp("<h1>.+?</h1>");

  if (!titleRole) {
    return "";
  }

  const title = content
    .match(titleRole)?.[0]
    .replace("<h1>", "")
    .replace("</h1>", "");

  return title;
};

export const getDescription = content => {
  const regexp = /<p>.+?</g;

  const paragraph = content.match(regexp);

  const formatedParagraph = paragraph.map(item =>
    item.replace("<p>", "").replace("<", "")
  ).join("");

  return formatedParagraph;
};

export const getSecondTitle = content => {
  const regexp = /<h2>.+?</g;

  const secondTitleList = content.match(regexp);

  const formatedSecondTitleList = secondTitleList.map(item =>
    item.replace("<h2>", "").replace("<", "")
  );

  return formatedSecondTitleList;
};

export const getWordCount = content => {
  let count = content.replace(/<[^>]*>/g, " ");
  count = count.replace(/\s+/g, " ");
  count = count.trim();
  const wordCount = count.split(" ").length;

  return wordCount;
};

export const getDate = content => {
  const dateRole = new RegExp("<p>date:.+?</p>");

  if (!dateRole) {
    return "";
  }

  const date = content
    .match(dateRole)?.[0]
    .replace("<p>date:", "")
    .replace("</p>", "");

  return date;
};

export const getAgenda = content => {
  const agendaRole = new RegExp("</h2>(.|\n)*?</ul>");

  if (!agendaRole) {
    return "";
  }

  const agenda = content.match(agendaRole)?.[0];

  return agenda;
};
