import moment = require('moment');
import uuid = require('uuid');





export class UuidHelper {
  /**
   * Generate uuid v4
   */
  static newUuid = () => uuid.v4();
}
export class DateTimeHelper {
  /**
   * Generate current time epoch
   */
  static getNowUnix = () => moment().unix();
  static rotation = () => {
    const now = Date.now();
    const dateObj = new Date(now);
    return `.${dateObj.getFullYear()}_${dateObj.getMonth() + 1}_${dateObj.getDate()}_${dateObj.getHours()}_${dateObj.getMinutes()}_${dateObj.getSeconds()}_${dateObj.getMilliseconds()}`;
  };
}
export const convertStringToSlug = function (str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  const from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  const to =
    "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

