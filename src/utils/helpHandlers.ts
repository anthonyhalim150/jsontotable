export function showHelp() {
    console.log(`
    🧾 JSON to Table Converter
  
    Usage:
      jsontotables <input.json> [--format markdown|tsv|plaintext] [--out output.txt]
  
    Options:
      --format     Output format (markdown, tsv, plaintext). Default is markdown.
      --out        Output file path. If omitted, output will be printed to console.
      -h, --help   Show this help message.
  
    Example:
      jsontotables data.json --format tsv --out table.tsv
    `)
  }
  