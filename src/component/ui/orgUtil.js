

import {treeDataConversion} from './treeData';
import http from '../../axios/http';


let orgUtil = {
    findOrg : '',
}

orgUtil.findOrg = (callback) => {
    http.post({
        url: '/org/findOrg',
        data: {},
        success: (res) => {
            treeDataConversion(res);
            callback(res);
        }
    });
}

export default orgUtil;