'use strict'

const m = require('mithril')

const Table = {
  oninit (vnode) {
    if (!vnode.attrs.noRowsText) {
      vnode.attrs.noRowsText = 'No rows available'
    }
  },

  view (vnode) {
    return [
      m('table.table',
        m('thead',
          m('tr',
            vnode.attrs.headers.map((header) => m('th', header)))),
        m('tbody',
          vnode.attrs.rows.length > 0
          ? vnode.attrs.rows
              .map((row) =>
                m('tr',
                  row.map((col) => m('td', col))))
          : m('tr',
              m('td.text-center', { colSpan: vnode.attrs.headers.length },
                vnode.attrs.noRowsText))
        )
      )
    ]
  }
}

module.exports = Table
