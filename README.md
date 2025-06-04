# dtsfmt

A Visual Studio Code extension that provides formatting support for DeviceTree (.dts) files using the `dtsfmt` formatter.

## Features

- Format DeviceTree files with the `dtsfmt` command-line tool
- Integrates seamlessly with VS Code's built-in formatting commands
- Automatically detects workspace folder for proper formatting context

## Requirements

- [dtsfmt](https://github.com/mskelton/dtsfmt) must be installed and available in your system PATH

## Usage

To set dtsfmt as the default formatter for DeviceTree files, add the following to your VS Code settings:

```json
{
  "[dts]": {
    "editor.defaultFormatter": "mskelton.dtsfmt"
  }
}
```

You can also set it through the VS Code UI:

1. Open a `.dts` file
2. Right-click and select "Format Document With..."
3. Choose "Configure Default Formatter..."
4. Select "dtsfmt"

## Development

To contribute or modify the extension:

1. Clone the repository
2. Install dependencies: `npm install`
3. Compile TypeScript: `npm run compile`
4. Open in VS Code and press `F5` to run the extension in a new Extension Development Host window

### Available Scripts

- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and recompile
- `npm run fmt` - Format source code with Prettier
- `npm run package` - Package the extension for distribution
