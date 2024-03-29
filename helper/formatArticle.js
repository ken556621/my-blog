import { getSecondTitle } from "@/helper/getArticleTag";

export const setSecondTitleId = content => {
  const splitedContent = content.split("");

  const secondTitleList = getSecondTitle(content);

  let count = 0;

  splitedContent.forEach((item, index) => {
    if (index === 0 || index === 1) return;

    // Set id in markdown
    if (
      item === "2" &&
      splitedContent[index - 1] === "h" &&
      splitedContent[index - 2] !== "/"
    ) {
      // Id
      splitedContent.splice(index + 1, 0, " ");
      splitedContent.splice(
        index + 2,
        0,
        `id=${secondTitleList[count] ? secondTitleList[count].replace(/ /g, "") : secondTitleList[count - 1]}`
      );
      count++;
    }
  });

  return splitedContent.join("");
};
