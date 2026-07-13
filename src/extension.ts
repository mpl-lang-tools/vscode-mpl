import * as fs from "node:fs";
import * as path from "node:path";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  const executable = process.platform === "win32" ? "mpl-lsp.exe" : "mpl-lsp";
  const bundledServer = context.asAbsolutePath(path.join("server", executable));
  const command = fs.existsSync(bundledServer) ? bundledServer : executable;

  const serverOptions: ServerOptions = {
    run: {
      command,
      transport: TransportKind.stdio,
    },
    debug: {
      command,
      transport: TransportKind.stdio,
    },
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "mpl" }],
  };

  client = new LanguageClient("mpl", "MPL Language Server", serverOptions, clientOptions);
  await client.start();
}

export async function deactivate(): Promise<void> {
  await client?.dispose();
  client = undefined;
}
