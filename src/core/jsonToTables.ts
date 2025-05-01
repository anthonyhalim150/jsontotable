export type Align = 'left' | 'center' | 'right'

export interface TableOptions {
  align?: Record<string, Align>
  only?: string[]
  sortBy?: string
  format?: 'markdown' | 'tsv' | 'plaintext' | 'html'
  tableClassName?: string
  thClassName?: string
  tdClassName?: string
}

export function jsonToTables(data: object[], options: TableOptions = {}): string {
  if (!Array.isArray(data)) {
    throw new Error('Input must be an array of objects.')
  }
  if (data.length === 0) return ''

  const keys = options.only || Object.keys(data[0])
  const align = options.align || {}
  const format = options.format || 'markdown'
  const tableClassName = options.tableClassName
  const thClassName = options.thClassName
  const tdClassName = options.tdClassName
  const sortBy = options.sortBy

  const rows = [...data]

  if (sortBy && keys.includes(sortBy)) {
    rows.sort((a, b) => {
      const aVal = (a as any)[sortBy]
      const bVal = (b as any)[sortBy]
      return String(aVal ?? '').localeCompare(String(bVal ?? ''))
    })
  }

  const sanitize = (val: any): string => {
    if (val === null || val === undefined) return ''
    return String(val).replace(/\r?\n/g, ' ').trim()
  }

  const rawRows = rows.map(item => keys.map(k => sanitize((item as any)[k])))

  if (format === 'tsv') {
    const header = keys.join('\t')
    const body = rawRows.map(row => row.join('\t'))
    return [header, ...body].join('\n')
  }

  if (format === 'plaintext') {
    const colWidths = keys.map((k, i) =>
      Math.max(k.length, ...rawRows.map(row => row[i]?.length || 0))
    )

    const formatRow = (row: string[]) =>
      row.map((cell, i) => cell.padEnd(colWidths[i], ' ')).join('  ')

    const header = formatRow(keys)
    const body = rawRows.map(formatRow)
    return [header, ...body].join('\n')
  }

  if (format === 'markdown') {
    const header = `| ${keys.join(' | ')} |`
    const divider = `|${keys.map(k => {
      const a = align[k] || 'left'
      return a === 'center' ? ':---:' : a === 'right' ? '---:' : ':---'
    }).join('|')}|`
    const body = rawRows.map(row => `| ${row.join(' | ')} |`)
    return [header, divider, ...body].join('\n')
  }

  if (format === 'html') {
    const buildAttrs = (cls?: string, align?: Align) => {
      const parts = []
      if (cls) parts.push(`class="${cls}"`)
      if (align) parts.push(`style="text-align:${align}"`)
      return parts.length ? ' ' + parts.join(' ') : ''
    }

    const thead = `<thead><tr>${keys.map(k =>
      `<th${buildAttrs(thClassName, align[k])}>${k}</th>`
    ).join('')}</tr></thead>`

    const tbody = rawRows.map(row =>
      `<tr>${row.map((cell, i) =>
        `<td${buildAttrs(tdClassName, align[keys[i]])}>${cell}</td>`
      ).join('')}</tr>`
    ).join('')

    const tableAttr = tableClassName ? ` class="${tableClassName}"` : ''
    return `<table${tableAttr}>${thead}<tbody>${tbody}</tbody></table>`
  }

  throw new Error(`Unknown format: ${format}`)
}
