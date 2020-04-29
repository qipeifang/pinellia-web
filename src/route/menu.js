/**
 * 菜单路由
 */

import User from '../component/console/user/UserIndex';                 //用户管理
import Role from '../component/console/role/RoleIndex';                 //角色管理
import Org from '../component/console/org/OrgIndex';                    //组织管理
import Menu from '../component/console/menu/MenuIndex';                 //菜单管理
import Dict from '../component/console/dict/DictIndex';                 //数据字典
import SysParam from '../component/console/sysParam/SysParamIndex';     //系统参数
import OperationLog from '../component/console/log/OperationLog';       //操作日志



export default {
    // 菜单相关路由
    SYS         : {  component: '',    icon: 'setting'},        //系统管理
    SYS_USER    : {  component: User,  icon: ''  },             //用户管理
    SYS_ROLE    : {  component: Role,  icon: ''  },             //角色管理        
    SYS_ORG     : {  component: Org,    icon: ''  },            //组织机构
    SYS_MENU    : {  component: Menu,    icon: ''  },           //菜单管理
    SYS_DICT    : {  component: Dict,    icon: ''  },           //数据字典
    SYS_PARAM   : {  component: SysParam,    icon: ''  },       //系统参数
    SYS_LOG     : {  component: OperationLog,    icon: ''  },   //操作日志
    
}