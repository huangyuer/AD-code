// 近3个月
function getLast3Month() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1; //0-11表示1-12月
  var day = now.getDate();
  var dateObj = {};
  //   dateObj.now = year + '-' + month + '-' + day;
  dateObj.now = month + '.' + day;

  var nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
  if (month - 3 <= 0) { //如果是1、2、3月，年数往前推一年
    var last3MonthDay = new Date((year - 1), (12 - (3 - parseInt(month))), 0).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
      //   dateObj.last = (year - 1) + '-' + (12 - (3 - month)) + '-' + last3MonthDay;
      dateObj.last = (12 - (3 - month)) + '.' + last3MonthDay;
    } else {
      //   dateObj.last = (year - 1) + '-' + (12 - (3 - month)) + '-' + day;
      dateObj.last = (12 - (3 - month)) + '.' + day;
    }
  } else {
    var last3MonthDay = new Date(year, (parseInt(month) - 3), 0).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) { //当前天日期小于当前月总天数,2月份比较特殊的月份
        // dateObj.last = year + '-' + (month - 3) + '-' + (last3MonthDay - (nowMonthDay - day));
        dateObj.last = (month - 3) + '.' + (last3MonthDay - (nowMonthDay - day));
      } else {
        // dateObj.last = year + '-' + (month - 3) + '-' + last3MonthDay;
        dateObj.last = (month - 3) + '.' + last3MonthDay;
      }
    } else {
      //   dateObj.last = year + '-' + (month - 3) + '-' + day;
      dateObj.last = (month - 3) + '.' + day;
    }
  }
  console.log("getLast3Month", dateObj);

  return dateObj;
}
// 近一个月
function getLastMonth() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1; //0-11表示1-12月
  var day = now.getDate();
  var dateObj = {};
  //   dateObj.now = year + '-' + month + '-' + day;
  dateObj.now = month + '.' + day;
  var nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
  if (month - 1 <= 0) { //如果是1月，年数往前推一年<br>　　　　 
    // dateObj.last = (year - 1) + '-' + 12 + '-' + day;
    dateObj.last = 12 + '.' + day;

  } else {
    var lastMonthDay = new Date(year, (parseInt(month) - 1), 0).getDate();
    if (lastMonthDay < day) { //1个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) { //当前天日期小于当前月总天数
        // dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day));
        dateObj.last = (month - 1) + '.' + (lastMonthDay - (nowMonthDay - day));

      } else {
        // dateObj.last = year + '-' + (month - 1) + '-' + lastMonthDay;
        dateObj.last = (month - 1) + '.' + lastMonthDay;

      }
    } else {
      //   dateObj.last = year + '-' + (month - 1) + '-' + day;
      dateObj.last = (month - 1) + '.' + day;

    }
  }
  console.log("getLastMonth", dateObj);

  return dateObj;
}

function getLastYear() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1; //0-11表示1-12月
  var day = now.getDate();
  var dateObj = {};
  //   dateObj.now = year + '-' + month + '-' + day;
  dateObj.now = month + '.' + day;
  var nowMonthDay = new Date(year, month, 0).getDate(); //当前月的总天数
  if (month - 6 <= 0) { //如果是1、2、3月，年数往前推一年
    var last3MonthDay = new Date((year - 1), (12 - (6 - parseInt(month))), 0).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
      //   dateObj.last = (year - 1) + '-' + (12 - (6 - month)) + '-' + last3MonthDay;
      dateObj.last = (12 - (6 - month)) + '.' + last3MonthDay;
    } else {
      //   dateObj.last = (year - 1) + '-' + (12 - (6 - month)) + '-' + day;
      dateObj.last = (12 - (6 - month)) + '.' + day;
    }
  } else {
    var last3MonthDay = new Date(year, (parseInt(month) - 6), 0).getDate(); //3个月前所在月的总天数
    if (last3MonthDay < day) { //3个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) { //当前天日期小于当前月总天数,2月份比较特殊的月份
        // dateObj.last = year + '-' + (month - 6) + '-' + (last3MonthDay - (nowMonthDay - day));
        dateObj.last = (month - 6) + '.' + (last3MonthDay - (nowMonthDay - day));

      } else {
        // dateObj.last = year + '-' + (month - 6) + '-' + last3MonthDay;
        dateObj.last = (month - 6) + '.' + last3MonthDay;

      }
    } else {
      //   dateObj.last = year + '-' + (month - 6) + '-' + day;
      dateObj.last = (month - 6) + '.' + day;

    }
  }
  console.log("getLastYear", dateObj);

  return dateObj;
}
export {
  getLastYear,
  getLastMonth,
  getLast3Month
}
