import * as fs from 'fs'
import * as path from 'path'
import * as vscode from 'vscode';
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
let docOriginalSearchResults = new Map<vscode.Uri, string>();
let docLastRemovedLines = new Map<vscode.Uri, number[]>();

/** Activate document closed handler */
function activateDocClosed(context: vscode.ExtensionContext): void {
	const disposable = vscode.workspace.onDidCloseTextDocument((doc: vscode.TextDocument) => {
		if (docOriginalSearchResults.has(doc.uri)) { docOriginalSearchResults.delete(doc.uri); }
		if (docLastRemovedLines.has(doc.uri)) { docLastRemovedLines.delete(doc.uri); }
	});
	context.subscriptions.push(disposable);
}
// inital filter Button
function activateInitUI(context: vscode.ExtensionContext): void {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//const config = vscode.workspace.getConfiguration(""); // searchFilter.inComments
	// if(!initPara()){return;} // 从配置中获取初始化参数
	let dispDoFilter = commands.registerCommand("searchFilter.doFilter", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscAnalyze();
		let cte = vscode.window.activeTextEditor;
		//config.searchFilter.inComments = true
		setFlag('DoFilter', true)
		setFlag('InComments', false)  // 默认设置为代码中过滤
		setFlag('String', 0)  // 默认全部代码
		showIt(textEditor)
		//let res = await workspace.findFiles('**​/*.ts', '**​/node_modules/**', 10)
	})
	let dispDoNotFilter = commands.registerCommand("searchFilter.doNotFilter", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscClean();
		setFlag('DoFilter', false)
		showIt(textEditor)
	})

	let dispInComments = commands.registerCommand("searchFilter.inComments", async (textEditor: vscode.TextEditor) => {
		setFlag('InComments', true)
		showIt(textEditor)
	})
	let dispNotInComments = commands.registerCommand("searchFilter.notInComments", async (textEditor: vscode.TextEditor) => {
		setFlag('InComments', false)
		// 默认代码的所有部分检查
		setFlag('String', 0)
		showIt(textEditor)
	})

	let dispInString = commands.registerCommand("searchFilter.inString", async (textEditor: vscode.TextEditor) => {
		setFlag('String', 1)
		showIt(textEditor)
	})
	let dispNotInString = commands.registerCommand("searchFilter.notInString", async (textEditor: vscode.TextEditor) => {
		setFlag('String', 2)
		showIt(textEditor)
	})
	let dispCodeAll = commands.registerCommand("searchFilter.codeAll", async (textEditor: vscode.TextEditor) => {
		setFlag('String', 0)
		showIt(textEditor)
	})

	context.subscriptions.push(dispDoFilter);
	context.subscriptions.push(dispDoNotFilter);
	context.subscriptions.push(dispInComments);
	context.subscriptions.push(dispNotInComments);
	context.subscriptions.push(dispInString);
	context.subscriptions.push(dispNotInString);
	context.subscriptions.push(dispCodeAll);

	// * Handle active file changed
	vscode.window.onDidChangeActiveTextEditor(async editor => {
		console.log('onDidChangeActiveTextEditor')
		if (editor) {

			if (editor && editor.document.languageId === "search-result") {
				triggerDocChange(editor.document)
				//triggerUpdateDecorations();  activeEditor.document.uri.fragment
			}
			// Set regex for updated language
			// await parser.SetRegex(editor.document.languageId);

			// Trigger update to set decorations for newly active file
			//triggerUpdateDecorations();
		}
	}, null, context.subscriptions);

	// * Handle file contents changed
	vscode.workspace.onDidChangeTextDocument(event => {

		// Trigger updates if the text was changed in the same document
		// actions such as autoformatting can fire loads of changes at the same time. Maybe we should ignore big chunks of changes?
		// TODO: perhaps there could be a smarter way to find autoformatting actions? Like, many changes that are not next to each other?
		// if (e.contentChanges.length > 30) {
		// return
		// }
		let cte = vscode.window.activeTextEditor;
		if (event.contentChanges.length === 0 || event.document.languageId !== "search-result") {
			return
		}
		// try to provideTextSearchResults and TextSearchResult
		// https://code.visualstudio.com/updates/v1_26#_textsearchprovider-filesearchprovider-fileindexprovider
		// FileSearchProvider
		// 当前窗口操作，需要保存相关数据
		triggerDocChange(event.document)
	}, null, context.subscriptions);
}

// // Don't show save changes 不显示内容有变化
// vscode.commands.executeCommand('cleanSearchEditorState');
export {activateDocClosed,activateInitUI}