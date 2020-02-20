'use strict'

const m = require('mithril')
const _ = require('lodash')

const api = require('../services/api')
const layout = require('../components/layout')

/**
 * Displays information for a particular agent
 */
const AgentDetailPage = {
  oninit(vnode) {
    api.get(`agents/${vnode.attrs.publicKey}`)
      .then(agent => {vnode.state.agent = agent})
      .catch(api.alertError)
  },

  view (vnode) {
    const publicKey = _.get(vnode.state, 'agent.public_key', '')
    const timestamp = new Date(
      _.get(vnode.state, 'agent.timestamp', '') * 1000).toString()
    return [
      layout.title(_.get(vnode.state, 'agent.name', '')),
      m('.container',
        layout.row(layout.staticField('Public Key', publicKey)),
        layout.row(layout.staticField('Registered', timestamp)))
    ]
  }
}

module.exports = AgentDetailPage
