/* eslint-disable @typescript-eslint/naming-convention */
// 此文件用于导出所有以 getLang 函数方式引用的多语言包
import * as util from 'util';
import * as vscode from 'vscode';
const config = JSON.parse(process.env.VSCODE_NLS_CONFIG || '');
let locale = config['locale'] || 'en';

// 总共需要的词组清单
type langGroup = 'hello'
|'maxNumFiles'


// 英文字典清单
let defaultLang:Record<langGroup, string>= {
    hello: 'default hello'
    ,maxNumFiles:'----max number of files[%d]----'

}
// 中文需要填写的
let zhcnLang:Record<langGroup, string>= {
    hello: '你好'
    ,maxNumFiles:'----达到文件数上限[%d]----'

}
// 语言包汇总
let lang = {
    'en': defaultLang,
    'zh-cn': zhcnLang
};
// 通过此方法获取信息
export function getLang(key: langGroup, ...msg:any) {
    let local = lang[locale][key];
    if(msg!=null)
    {
        return util.format(local,...msg);
    }else{
        return local;
    }
}

