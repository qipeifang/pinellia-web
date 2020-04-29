
import http from '../axios/http';

import messager from '../component/ui/messager';

let ocr = {
    baiduOCR: ''
}

/**
 * 进行ocr识别
 * @param image	要识别的图片
 * @param imageType	识别的图片类型 身份证
 * @param idCardSide 如果imageType=idCard，说明是身份证识别，这时候要传这个参数来定于是正面还是反面，front：身份证含照片的一面；back：身份证带国徽的一面
 * @returns	返回识别的结果
 */
ocr.baiduOCR = (options) => {
	//构建要提交的参数
	var data = {"imageType":options.imageType};
	//获取要识别的图片
	var base64Image = options.image;
	if(base64Image == null || base64Image === "" ){
        messager.notify("图片不可为空");
		return;
	}
    //js直接转换的base数据到百度会报 image format error 异常，所以需要在这里做这个处理
    base64Image = base64Image.replace("data:image/jpeg;base64,","");
    base64Image = base64Image.replace("data:image/png;base64,","");
    base64Image = base64Image.replace("data:image/jpg;base64,","");
    //添加到参数中
    data.image = base64Image;
	if(options.imageType === "P1"){
		//判断是否要识别的是否为身份证信息
		var id_card_side = options.idCardSide;
		if(id_card_side == null){
			//如果要是被的身份证正反面信息为空，则默认为识别正面
			id_card_side = "front";
		}
		data.idCardSide = id_card_side;
    }
    http.post({
        url: '/ocr/imageRecognition',
        data: data,
        success: (res) => {
            if(options.imageType === "P1"){
				if(res.image_status !== "normal"){
                    messager.notify("识别失败");
					return false;
				}
            }
            if(res.error_code != null && res.error_code !== ""){
                messager.notify(res.error_msg,"识别失败",'error');
            }else{
                //正常识别
                res = res.words_result;
                //调用传入的回调函数
                if(options.callback){
                    options.callback(res);
                }
            }
        },
        error: (res) =>{
            messager.notify(res,"识别失败",'error');
        }
    });
}

export default ocr;

