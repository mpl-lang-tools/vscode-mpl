// Release-time helper for VSIX packaging.
//
// Copies a prebuilt `mpl-lsp` binary into this extension's `server/` directory
// so `vsce package` includes it. Pass the Cargo-built binary path as the first
// CLI argument, or use the default `../mpl/target/release/mpl-lsp` checkout.

import { copyFileSync, chmodSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const defaultExecutableName = process.platform === "win32" ? "mpl-lsp.exe" : "mpl-lsp";
const defaultSource = join(packageRoot, "..", "mpl", "target", "release", defaultExecutableName);
const source = process.argv[2] ?? defaultSource;
const sourcePath = resolve(source);

if (!existsSync(sourcePath)) {
  console.error(`MPL LSP binary does not exist: ${sourcePath}`);
  process.exit(1);
}

const serverDir = join(packageRoot, "server");
const executableName = basename(sourcePath).endsWith(".exe") ? "mpl-lsp.exe" : "mpl-lsp";
const destination = join(serverDir, executableName);

rmSync(serverDir, { recursive: true, force: true });
mkdirSync(serverDir, { recursive: true });
copyFileSync(sourcePath, destination);

if (!destination.endsWith(".exe")) {
  chmodSync(destination, 0o755);
}

console.log(`Staged ${destination}`);
