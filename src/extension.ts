// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {commands} from 'vscode';
//import {vscAnalyze,initPara,vscClean,vscMove,vscDownload, vscUpload,vscInsertClip,
//	vscConvertImageFormat,vscConvertImageLink}  from './index';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, extension "searchFilter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	//const config = vscode.workspace.getConfiguration(""); // searchFilter.inComments
	// if(!initPara()){return;} // 从配置中获取初始化参数
	let dispDoFilter = commands.registerCommand("searchFilter.doFilter", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscAnalyze();
		let ctx = context;
		//config.searchFilter.inComments = true
		commands.executeCommand('setContext', 'searchFilter.doFilterFlag', true);
		// 默认设置为代码中过滤
		commands.executeCommand('setContext', 'searchFilter.inCommentsFlag', false);
		// 默认全部代码
		commands.executeCommand('setContext', 'searchFilter.StringFlag', 0);
	})
	let dispDoNotFilter = commands.registerCommand("searchFilter.doNotFilter", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscClean();
		commands.executeCommand('setContext', 'searchFilter.doFilterFlag', false);
	})

	let dispInComments = commands.registerCommand("searchFilter.inComments", async (textEditor: vscode.TextEditor) => {
		commands.executeCommand('setContext', 'searchFilter.inCommentsFlag', true);
	})
	let dispNotInComments = commands.registerCommand("searchFilter.notInComments", async() => {
		commands.executeCommand('setContext', 'searchFilter.inCommentsFlag', false);
		// 默认代码的所有部分检查
		commands.executeCommand('setContext', 'searchFilter.StringFlag', 0);
	})

	let dispInString = commands.registerCommand("searchFilter.inString", async () => {
		commands.executeCommand('setContext', 'searchFilter.StringFlag', 1);
	})
	let dispNotInString = commands.registerCommand("searchFilter.notInString", async () => {
		commands.executeCommand('setContext', 'searchFilter.StringFlag', 2);
	})
	let dispCodeAll = commands.registerCommand("searchFilter.codeAll", async () => {
		commands.executeCommand('setContext', 'searchFilter.StringFlag', 0);
	})

	context.subscriptions.push(dispDoFilter);
	context.subscriptions.push(dispDoNotFilter);
	context.subscriptions.push(dispInComments);
	context.subscriptions.push(dispNotInComments);
	context.subscriptions.push(dispInString);
	context.subscriptions.push(dispNotInString);
	context.subscriptions.push(dispCodeAll);



}

// this method is called when your extension is deactivated
export function deactivate() {}
