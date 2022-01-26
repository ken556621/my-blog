import round from "lodash/round";

export const rpx = (px, screenW = 1440) => {
  return `${round((px / screenW) * 100, 4)}vw`;
};
