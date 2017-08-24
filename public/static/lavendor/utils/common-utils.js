/**
 * Created by yanghao on 2017/8/24.
 *
 */

/**
 * 格式化时间
 * @param time 需要格式化的时间值
 * @format format 格式化格式
 */
function dateTimeFormatter(time,format){
    var date = new Date(time);
    var year = date.getFullYear();
    var o = {
        'M+' : date.getMonth()+1,
        "d+" : date.getDate(), // day
        "h+" : date.getHours(), // hour
        "m+" : date.getMinutes(), // minute
        "ss" : date.getSeconds(), // second
        "ms" : date.getMilliseconds()
    }

    if(/(y+)/.test(format)){
        format = format.replace(RegExp.$1,(year + " ").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}