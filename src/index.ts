import * as fs from 'fs'
import * as path from 'path'
import {commands,TextEditor,TextDocument, workspace } from 'vscode';
let filterFlag={
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DoFilter : true,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    InComments: false,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    String :0 
}
import { getLang } from './lang';

let contentHash = {}  // 具体数据内容
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

function triggerDocChange(doc:TextDocument)
{
    // 根据 uri 保存 当前操作的数据
    let uri = doc.uri.toString()
    contentHash[uri] = doc.getText()
    // 需要根据 hightlight 来获取搜索内容
    // search.searchEditor.defaultNumberOfContextLines
}

export {filterFlag,showIt,setFlag,triggerDocChange}