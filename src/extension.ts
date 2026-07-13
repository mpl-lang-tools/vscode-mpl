import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export async function activate(): Promise<void> {
  const executable = process.platform === "win32" ? "mpl-lsp.exe" : "mpl-lsp";

  const serverOptions: ServerOptions = {
    run: {
      command: executable,
      transport: TransportKind.stdio,
    },
    debug: {
      command: executable,
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
