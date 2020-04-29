/**
 * 对树形数据进行转换，以满足antd的使用要求
 */

/**
 * 对后台传过来的树型数据进行处理，用于满足easyui的显示需要
 * @param node
 * @returns
 */
const treeDataConversion = (node)=> {
    treeLoop(node);
}

//递归方式处理数据
// const treeRecursion = (tree) => {
//     if(tree != null && tree.length > 0 ){
//         for(let i=0;i<tree.length;i++){
//             tree[i].children = tree[i].subNode;
//             tree[i].title = tree[i].name;
//             tree[i].value = tree[i].code;
//             delete tree[i].subNode;
//             treeRecursion(tree[i].children);
//         }
//     }
// }

//使用非递归方式处理树型数据
const treeLoop =(tree)=>{
    var stack = [];
    stack = stack.concat(tree);
    while(stack != null && stack.length > 0){
        let node = stack[0];
        stack.splice(0,1);
        if(node.subNode != null){
            stack = stack.concat(node.subNode);
        }
        //处理数据
        node.children = node.subNode;
        node.title = node.name;
        node.value = node.code;
        delete node.subNode;
    }
}

export {treeDataConversion};