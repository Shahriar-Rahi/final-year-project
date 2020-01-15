'use strict'

const m = require('mithril')
const sortBy = require('lodash/sortBy')
const Table = require('../components/tables.js')
const api = require('../services/api')

const AgentList = {
  oninit (vnode) {
    vnode.state.agents = []
    api.get('agents').then((agents) => {
        vnode.state.agents = sortBy(agents, 'name')
    })
  },

  view (vnode) {
    return [
      m('.agent-list',
        m(Table, {
          headers: [
            'Name',
            'Key'
          ],
          rows: vnode.state.agents
            .map((agent) => [
              m(`a[href=/agents/${agent.public_key}]`,
                { oncreate: m.route.link },
                agent.name),
              agent.public_key,
            ]),
          noRowsText: 'No agents found'
        })
      )
    ]
  }
}

module.exports = AgentList
