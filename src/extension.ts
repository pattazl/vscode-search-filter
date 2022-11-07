// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {commands} from 'vscode';
import {filterFlag,setFlag, showIt} from './index';
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
		let cte = vscode.window.activeTextEditor;
		//config.searchFilter.inComments = true
		setFlag('DoFilter' , true ) 
		setFlag('InComments' , false )  // 默认设置为代码中过滤
		setFlag('String' , 0 )  // 默认全部代码
		showIt(textEditor)
	})
	let dispDoNotFilter = commands.registerCommand("searchFilter.doNotFilter", async (textEditor: vscode.TextEditor) => {
		//if(!initPara()){return;} // 参数可能更新，重新从配置中获取初始化参数
		//vscClean();
		setFlag('DoFilter' , false ) 
		showIt(textEditor)
	})

	let dispInComments = commands.registerCommand("searchFilter.inComments", async (textEditor: vscode.TextEditor) => {
		setFlag('InComments' , true ) 
		showIt(textEditor)
	})
	let dispNotInComments = commands.registerCommand("searchFilter.notInComments", async(textEditor: vscode.TextEditor) => {
		setFlag('InComments' , false ) 
		// 默认代码的所有部分检查
		setFlag('String' , 0 ) 
		showIt(textEditor)
	})

	let dispInString = commands.registerCommand("searchFilter.inString", async (textEditor: vscode.TextEditor) => {
		setFlag('String' , 1 ) 
		showIt(textEditor)
	})
	let dispNotInString = commands.registerCommand("searchFilter.notInString", async (textEditor: vscode.TextEditor) => {
		setFlag('String' , 2 ) 
		showIt(textEditor)
	})
	let dispCodeAll = commands.registerCommand("searchFilter.codeAll", async (textEditor: vscode.TextEditor) => {
		setFlag('String' , 0 ) 
		showIt(textEditor)
	})

	vscode.window.onDidChangeActiveTextEditor((e) => {
		console.log('onDidChangeActiveTextEditor')
 	}, null, context.subscriptions);

	context.subscriptions.push(dispDoFilter);
	context.subscriptions.push(dispDoNotFilter);
	context.subscriptions.push(dispInComments);
	context.subscriptions.push(dispNotInComments);
	context.subscriptions.push(dispInString);
	context.subscriptions.push(dispNotInString);
	context.subscriptions.push(dispCodeAll);
	const documentChangeListener = vscode.workspace.onDidChangeTextDocument(
		(e: vscode.TextDocumentChangeEvent) => {
		  // actions such as autoformatting can fire loads of changes at the same time. Maybe we should ignore big chunks of changes?
		  // TODO: perhaps there could be a smarter way to find autoformatting actions? Like, many changes that are not next to each other?
		  // if (e.contentChanges.length > 30) {
		  // return
		  // }
		  let cte = vscode.window.activeTextEditor;
		  if (e.contentChanges.length === 0) {
			return
		  }
	
		  // iterate over all changes, necessary to keep old edits line numbers up to date
		  //e.contentChanges.forEach((change) => addEdit(change.text, change.range, e.document))
		},
	  )


}

// this method is called when your extension is deactivated
export function deactivate() {}
