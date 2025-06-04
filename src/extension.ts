import * as vscode from 'vscode'
import { spawn } from 'child_process'

export function activate(context: vscode.ExtensionContext) {
  const formatter = vscode.languages.registerDocumentFormattingEditProvider(
    { scheme: 'file', language: 'dts' },
    {
      async provideDocumentFormattingEdits(
        document: vscode.TextDocument,
      ): Promise<vscode.TextEdit[]> {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(
          document.uri,
        )
        const cwd = workspaceFolder ? workspaceFolder.uri.fsPath : undefined

        return new Promise((resolve, reject) => {
          const documentText = document.getText()
          const dtsfmt = spawn('dtsfmt', ['--stdin', document.uri.fsPath], {
            cwd,
          })

          let stdout = ''
          let stderr = ''

          dtsfmt.stdout.on('data', (data) => {
            stdout += data.toString()
          })

          dtsfmt.stderr.on('data', (data) => {
            stderr += data.toString()
          })

          dtsfmt.on('close', (code) => {
            if (code !== 0) {
              reject(new Error(`dtsfmt error: ${stderr}`))
            } else {
              const fullRange = new vscode.Range(
                document.positionAt(0),
                document.positionAt(documentText.length),
              )

              resolve([vscode.TextEdit.replace(fullRange, stdout)])
            }
          })

          dtsfmt.on('error', (error) => {
            reject(new Error(`dtsfmt error: ${error.message}`))
          })

          dtsfmt.stdin.write(documentText)
          dtsfmt.stdin.end()
        })
      },
    },
  )

  context.subscriptions.push(formatter)
}

export function deactivate() {}
