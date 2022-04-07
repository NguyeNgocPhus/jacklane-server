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