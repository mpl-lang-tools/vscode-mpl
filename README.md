# MPL extension for Visual Studio Code

Language support for Axiom Metrics Processing Language in Visual Studio Code.

This extension starts `mpl-lsp` and connects to it with the Language Server Protocol. Packaged release builds can include a platform-specific language server under `server/`; source builds fall back to resolving `mpl-lsp` from your `PATH`. On Windows, the fallback executable is `mpl-lsp.exe` and it must be available through the `Path` environment variable.

If you are running from source without a staged `server/` binary, make sure the language server is installed and available before opening MPL files:

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

To package a VSIX with a bundled language server, build `mpl-lsp` from the `mpl-lang` repository and stage it first:

```sh
npm run stage -- ../mpl/target/release/mpl-lsp
npm run package -- --out mpl-vscode.vsix
```

The `Package VSIX` GitHub Actions workflow builds from `scristobal/mpl-analyzer` on `main` by default. To build from a different fork, set the manual `mpl_repository` input to `owner/repo` and `mpl_ref` to the branch, tag, or commit SHA. For tag-triggered runs, set repository variables named `MPL_REPOSITORY` and `MPL_REF`.

Manual workflow runs upload VSIX files as workflow run artifacts. Tag-triggered runs also create or update the matching GitHub Release and attach all platform VSIX files as release assets.
