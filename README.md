# jsontotables

[![NPM version](https://img.shields.io/npm/v/jsontotables.svg)](https://www.npmjs.com/package/jsontotables)
[![NPM downloads](https://img.shields.io/npm/dm/jsontotables.svg)](https://www.npmjs.com/package/jsontotables)
[![License](https://img.shields.io/npm/l/jsontotables.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node-%3E%3D14-green.svg)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)](https://github.com/anthonyhalim150/jsontotables/pulls)

> Easily convert JSON data to Markdown tables, plaintext tables, TSV, or HTML for documentation, reports, Notion, GitHub, Google Docs, and React UIs.

---

## ✨ Features

- 🔄 Convert JSON to Markdown, TSV, plaintext, or HTML table formats
- ⚙️ Command-line interface (CLI) and TypeScript library
- ⚛️ React utility (`jsonToReactTable`) available
- 🔍 Smart sorting, column selection, and text alignment
- 📦 Lightweight, dependency-free, fully typed

---

## 📦 Installation

### As a Library (Local)

```bash
npm install jsontotables
```

### As a CLI Tool (Global)

```bash
npm install -g jsontotables
```

---

## 📚 Usage Examples

### 1. Library: Convert JSON to Markdown Table

```ts
import { jsontotables } from 'jsontotables'

const json = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
]

// Convert JSON to Markdown format and store as a string
const markdownTable = jsontotables(json, { format: 'markdown' })

// Output the result
console.log(markdownTable)

// Save to file (Node.js)
import { writeFileSync } from 'fs'
writeFileSync('output.md', markdownTable)
```

### 2. Library: Convert to HTML or TSV

```ts
jsontotables(json, { format: 'html' })
jsontotables(json, { format: 'tsv' })
```

### 3. React Component Usage

```tsx
import { jsonToReactTable } from 'jsontotables/react'

const table = jsonToReactTable(data, {
  tableClassName: 'my-table',
  thClassName: 'header',
  tdClassName: 'cell',
  align: { age: 'right' }
})
```

### 4. CLI Examples

```bash
# Convert JSON to Markdown and print to console
jsontotables data.json

# Convert to TSV and save to file
jsontotables data.json --format tsv --out table.tsv

# Convert to plaintext and write to output
jsontotables data.json --format plaintext --out output.txt
```

Or without installing:

```bash
npx jsontotables data.json --format tsv
```

---

## ⚙️ CLI Options

| Option       | Description                            |
|--------------|----------------------------------------|
| `--format`   | Output format: markdown, plaintext, tsv, html |
| `--only`     | Comma-separated list of columns to include |
| `--sortBy`   | Column to sort rows by                |
| `--className`| HTML table class name (HTML only)     |
| `--help`     | Show usage                            |

---

## 📤 Output Examples

### Markdown

```markdown
| name  | age |
|:------|----:|
| Alice |  25 |
| Bob   |  30 |
```

### TSV

```
name	age
Alice	25
Bob	30
```

### Plaintext

```
name   age
-----  ---
Alice   25
Bob     30
```

---

## 📁 Project Structure

- `src/jsontotables.ts` – JSON to text/markdown/html/tsv
- `src/react/` – React rendering logic
- `src/bin/cli.ts` – CLI entry point
- `src/exportToTsv.ts` – TSV formatter
- `src/helpHandlers.ts` – CLI help/usage text

---

## 📄 License

MIT © [anthonyhalim150](https://github.com/anthonyhalim150)

---

## 🤝 Contributing

Contributions, ideas, bug reports, and feature requests are welcome!

If you'd like to help:
- ⭐ Star the repo to show support
- 🐛 Open an issue for bugs or suggestions
- 🔧 Fork the project and submit a pull request
- 📃 Ensure your code is linted and tested with `vitest`

Let’s make `jsontotables` better for the whole developer community!