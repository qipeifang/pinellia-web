
function moneyToCapital(n) {
    if (n === 0) {
        return "零";
    }
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
        return "";
    var unit = "千百拾亿千百拾万千百拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++)
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    return str.replace(/零(千|百|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|壹(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元整");
}

/**
 * 对数字进行处理，保留 decimal 位小数位
 */
function fixedNumber(value, decimal) {
    value = parseFloat(value);
    value = value.toFixed(decimal);
    return parseFloat(value);
}

function toDecimal2(x) {
    let f = parseFloat(x);
    if (isNaN(f)) {
        return 0.00;
    }
    let s = f.toFixed(2) + "";
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

function moneyFormat(value) {
    if(value == null || value === ""){
        return '';
    }
    return "￥"+toDecimal2(value);
}

/**
 * 对一个string格式的数字加一，返回跟原数字一样长度的字符串数字
 */
function stringAddOne(value){
    if(value == null || value === ""){
        return "1"; //如果为空则返回1
    }else{
        let length = value.length;
        value = parseInt(value);
        value++;
        value = value + "";
        if(value.length < length){
            for(let i= value.length;i<length;i++){
                value = "0"+value;
            }
        } 
        return value;
    }
}

let dateUtil = {
    getCurrentMonthLastDay: '',
    getCurrentMonthFirstDay: ''
};

dateUtil.getCurrentMonthLastDay = () => {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = new Date(year, month, 0).getDate();
    let yyyyMMdd = year + (month < 10 ? ('0' + month) : month) + (day < 10 ? ('0' + day) : day);
    return yyyyMMdd;
}

dateUtil.getCurrentMonthFirstDay = () => {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let yyyyMMdd = year + (month < 10 ? ('0' + month) : month) + '01';
    return yyyyMMdd;
}

export { moneyToCapital, fixedNumber, dateUtil, moneyFormat, stringAddOne };