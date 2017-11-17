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

/**
 * //提示消息 默认在div #alertContainer中显示
 * @param type      类型，danger,success,info....
 * @param msg       消息文本
 * @param seconds   消息停留时间
 * @param icon      消息显示图标
 */
function commonAlert(type,msg,seconds,icon){
    App.alert({
        container: '#alertContainer', // alerts parent container(by default placed after the page breadcrumbs)
        place: 'append', // append or prepent in container
        type: type,  // alert's type
        message: msg,  // alert's message
        close: true, // make alert closable
        reset: true, // close all previouse alerts first
        focus: false, // auto scroll to the alert after shown
        closeInSeconds: seconds, // auto close after defined seconds
        icon: icon // put icon before the message
    });
}

/**
 * 普通消息提示
 * @param msg
 * @param second
 */
function infoAlert(msg,second){
    second = second?second:5;
    commonAlert('info',msg,second,'check');
}

/**
 * 警告消息提示
 * @param msg
 * @param second
 */
function warnAlert(msg,second){
    second = second?second:5;
    commonAlert('warning',msg,second,'warning');
}

/**
 * 成功消息提示
 * @param msg
 * @param second
 */
function successAlert(msg,second){
    second = second?second:5;
    commonAlert('success',msg,second,'check');
}

/**
 * 错误消息提示
 * @param msg
 * @param second
 */
function dangerAlert(msg,second){
    second = second?second:5;
    commonAlert('danger',msg,second,'danger');
}