# MPL extension for Visual Studio Code

Language support for Axiom Metrics Processing Language in Visual Studio Code.

This extension starts `mpl-lsp` from your `PATH` and connects to it with the Language Server Protocol. On Windows, this means `mpl-lsp.exe` must be available through the `Path` environment variable. It also includes basic TextMate grammar for syntax highlighting.

Make sure the language server is installed and available before opening MPL files:

- macOS/Linux: `mpl-lsp` must be available on `PATH`.
- Windows: `mpl-lsp.exe` must be available on `Path`.

If you update `PATH` or `Path` while VS Code is open, restart VS Code so the extension sees the updated environment.

## Build and install from source

```sh
npm install
npm run build
npm run package -- --out mpl-vscode.vsix
code --install-extension mpl-vscode.vsix
```
