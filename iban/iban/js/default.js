console.log('期末考试\n加油啊');
document.getElementById('copyyear').innerHTML = new Date().getFullYear();
function isEmpty(v) { switch (typeof v) { case 'undefined': return true; case 'string': if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true; break; case 'boolean': if (!v) return true; break; case 'number': if (0 === v || isNaN(v)) return true; break; case 'object': if (null === v || v.length === 0) return true; for (var i in v) { return false } return true } return false }

/* https://blog.csdn.net/weixin_42971942/article/details/83585414 */
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

document.getElementById('date').innerHTML = getNowFormatDate();