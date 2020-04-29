/**
 * 输入校验
 */

 let validator = {
     naturalNum : { pattern: /^[0-9]+$/, message: '只能输入不小于0的整数!' },
     lineEnNum : { pattern: /^[0-9A-Za-z_]+$/, message: '只能输入英文、数字和下划线!' },
     lineEn : { pattern: /^[A-Za-z_]+$/, message: '只能输入英文和下划线!' },
     enNum : { pattern: /^[0-9A-Za-z]+$/, message: '只能输入英文和数字!' },
     tel : { pattern: /(^1(3|4|5|7|8)\d{9}$)|(^(0\d{2,3}-?)?\d{7,8}$)/, message: '电话号码错误!' },
     plateNo : { pattern: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/, message: '车牌号不正确!' },
     idcard: { pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '证件编号错误!' },
     creditNo: { pattern: /^[0-9A-Z]+$/, message: '证件号码错误!' },
    };


export default validator;



