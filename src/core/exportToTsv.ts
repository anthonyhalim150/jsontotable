import fs from 'fs'

export function exportToTsv(data: Record<string, any>[], filename: string) {
  if (!data.length) return

  const headers = Object.keys(data[0])
  const escape = (val: any) => `"${String(val).replace(/"/g, '""')}"`

  const rows = data.map(row =>
    headers.map(header => escape(row[header])).join('\t')
  )
  const content = [headers.map(escape).join('\t'), ...rows].join('\n')

  fs.writeFileSync(filename, content, { encoding: 'utf8' })
}
