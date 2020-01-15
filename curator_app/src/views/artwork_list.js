'use strict'

const m = require('mithril')
const sortBy = require('lodash/sortBy')
const Table = require('../components/tables.js')
const api = require('../services/api')

const ArtworkList = {
  oninit (vnode) {
    vnode.state.records = []
    api.get('records').then((records) => {
        vnode.state.records = sortBy(records, 'record_id')
      })
  },

  view (vnode) {
    return [
      m('.record-list',
        m(Table, {
          headers: [
            'ID'
          ],
          rows: vnode.state.records
            .map((record) => [
              m(`a[href=/artworks/${record.record_id}]`,
                { oncreate: m.route.link },
                record.record_id)
            ]),
          noRowsText: 'No records found'
        })
      )
    ]
  }
}

module.exports = ArtworkList
