// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { commands ,workspace} from 'vscode';
import { filterFlag, setFlag, showIt,triggerDocChange } from './index';
//import {vscAnalyze,initPara,vscClean,vscMove,vscDownload, vscUpload,vscInsertClip,
//	vscConvertImageFormat,vscConvertImageLink}  from './index';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function discoverAllFilesInWorkspace() {
	if (!vscode.workspace.workspaceFolders) {
	  return []; // handle the case of no open folders
	}
	  vscode.workspace.workspaceFolders.map(async workspaceFolder => {
		const pattern = new vscode.RelativePattern(workspaceFolder, '**/*.md');
		// const watcher = vscode.workspace.createFileSystemWatcher(pattern);
  
		// // When files are created, make sure there's a corresponding "file" node in the tree
		// watcher.onDidCreate(uri => getOrCreateFile(uri));
		// // When files change, re-parse them. Note that you could optimize this so
		// // that you only re-parse children that have been resolved in the past.
		// watcher.onDidChange(uri => parseTestsInFileContents(getOrCreateFile(uri)));
		// // And, finally, delete TestItems for removed files. This is simple, since
		// // we use the URI as the TestItem's ID.
		// watcher.onDidDelete(uri => controller.items.delete(uri.toString()));
  
		for (const file of await vscode.workspace.findFiles(pattern)) {
		  console.log(file)
		}
  /* 
		for (const file of await vscode.workspace.findFiles('**​/*', '**​/*', 10)) {
			console.log(file)
		}
		*/
	  });

  }
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	//let activeEditor: vscode.TextEditor;
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
		/*setFlag('DoFilter', true)
		setFlag('InComments', false)  // 默认设置为代码中过滤
		setFlag('String', 0)  // 默认全部代码
		showIt(textEditor)*/
		//let res = await workspace.findFiles('**​/*.ts', '**​/node_modules/**', 10)
		discoverAllFilesInWorkspace()
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
		if (event.contentChanges.length === 0 || event.document.languageId !== "search-result" ) {
			return
		}
		// try to provideTextSearchResults and TextSearchResult
		// https://code.visualstudio.com/updates/v1_26#_textsearchprovider-filesearchprovider-fileindexprovider
		// FileSearchProvider
		// 当前窗口操作，需要保存相关数据
		triggerDocChange(event.document)
	}, null, context.subscriptions);


}

// this method is called when your extension is deactivated
export function deactivate() { }
