// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { activateDocClosed,activateInitUI } from './index';
//import {vscAnalyze,initPara,vscClean,vscMove,vscDownload, vscUpload,vscInsertClip,
//	vscConvertImageFormat,vscConvertImageLink}  from './index';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// Original search results text per doc

export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	//let activeEditor: vscode.TextEditor;
	console.log('Congratulations, extension "searchFilter" is now active!');
	activateDocClosed(context);
	activateInitUI(context);
}

// this method is called when your extension is deactivated
export function deactivate() { }
