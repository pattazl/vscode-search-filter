import * as fs from 'fs'
import * as path from 'path'
import {commands,TextEditor} from 'vscode';
let filterFlag={
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DoFilter : true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    InComments: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    String :0 
}
import { getLang } from './lang';

// 根据 filterFlag 的状态处理显示内容，需要根据 fragment 保存临时数据
async function showIt(textEditor:TextEditor)
{
    // searchFilter.Flag
}

function setFlag(flagName:string,val:boolean|number)
{
    // searchFilter.Flag
    filterFlag[flagName] = val;
    commands.executeCommand('setContext', 'searchFilter.Flag.'+flagName, val);
}
export {filterFlag,showIt,setFlag}