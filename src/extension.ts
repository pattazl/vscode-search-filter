// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
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
	let dispInComments = vscode.commands.registerCommand("searchFilter.inComments", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscAnalyze();
		//config.searchFilter.inComments = true
		vscode.commands.executeCommand('setContext', 'searchFilter.inComments', false);
	})
	let dispNotInComments = vscode.commands.registerCommand("searchFilter.notInComments", async () => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscClean();
		vscode.commands.executeCommand('setContext', 'searchFilter.inComments', true);
	})
	
	context.subscriptions.push(dispInComments);
	context.subscriptions.push(dispNotInComments);

}

// this method is called when your extension is deactivated
export function deactivate() {}
