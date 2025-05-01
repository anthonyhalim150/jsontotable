import React from 'react'
import type { TableOptions } from '../core/jsonToTables.js'

type ExtendedOptions = TableOptions & {
  thClassName?: string
  tdClassName?: string
  tableClassName?: string
}

export function jsonToReactTables(data: object[], options: ExtendedOptions = {}): React.ReactElement {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('Input must be a non-empty array of objects.')
  }

  const keys = options.only || Object.keys(data[0])
  const align = options.align || {}
  const sortBy = options.sortBy
  const tableClassName = options.tableClassName
  const thClassName = options.thClassName
  const tdClassName = options.tdClassName

  const rows = [...data]

  if (sortBy && keys.includes(sortBy)) {
    rows.sort((a, b) => {
      const aVal = (a as any)[sortBy]
      const bVal = (b as any)[sortBy]
      return String(aVal ?? '').localeCompare(String(bVal ?? ''))
    })
  }

  return React.createElement('table', { className: tableClassName },
    React.createElement('thead', {},
      React.createElement('tr', {},
        keys.map(key =>
          React.createElement('th', {
            key,
            className: thClassName,
            style: align[key] ? { textAlign: align[key] } : undefined
          }, key)
        )
      )
    ),
    React.createElement('tbody', {},
      rows.map((row, rowIndex) =>
        React.createElement('tr', { key: rowIndex },
          keys.map(key =>
            React.createElement('td', {
              key: key,
              className: tdClassName,
              style: align[key] ? { textAlign: align[key] } : undefined
            }, String((row as any)[key] ?? ''))
          )
        )
      )
    )
  )
}
