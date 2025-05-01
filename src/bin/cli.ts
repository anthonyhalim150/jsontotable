#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { jsonToTables } from '../core/jsonToTables.js'
import { exportToTsv } from '../core/exportToTsv.js'
import { showHelp } from '../utils/helpHandlers.js'
import { showBanner } from '../utils/runJsontotableCli.js'

type Format = 'markdown' | 'tsv' | 'plaintext'

let format: Format = 'markdown'
let outputFile: string | null = null
let inputFile: string | null = null

const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
  showBanner()
  showHelp()
  process.exit(0)
}

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--format' && args[i + 1]) format = args[i + 1] as Format
  if (args[i] === '--out' && args[i + 1]) outputFile = args[i + 1]
  if (!args[i].startsWith('--') && !args[i - 1]?.startsWith('--')) inputFile = args[i]
}

if (!inputFile) {
  console.error('❌ No input file provided.\n')
  showHelp()
  process.exit(1)
}

if (!existsSync(inputFile)) {
  console.error(`❌ File not found: ${inputFile}`)
  process.exit(1)
}

try {
  const raw = readFileSync(inputFile, 'utf8')
  const data = JSON.parse(raw)

  if (!Array.isArray(data) || typeof data[0] !== 'object') {
    throw new Error('Input JSON must be an array of objects')
  }

  if (format === 'tsv' && outputFile) {
    exportToTsv(data, outputFile)
    console.log(`✅ TSV exported to ${outputFile}`)
  } else {
    const table = jsonToTables(data, { format })
    if (outputFile) {
      writeFileSync(outputFile, table, 'utf8')
      console.log(`✅ ${format.toUpperCase()} table exported to ${outputFile}`)
    } else {
      console.log('\n' + table)
    }
  }

} catch (err: any) {
  console.error(`❌ Error: ${err.message}`)
  process.exit(1)
}
