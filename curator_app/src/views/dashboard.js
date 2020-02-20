'use strict'

const m = require('mithril')

const Dashboard = {
  view(vnode) {
    return [
      m('.header.text-center.mb-4',
        m('h4', 'Supply Chain on'),
        m('h1.mb-3', 'Blockchain'),
        m('h5',
          m('em',
            'Developed by ',
            m('strong', 'Shahriar Rahi')))),
      m('.blurb',
        m('p',
          m('em', 'Supply Chain on Blockchain'),
          ' is a simple, general-purpose supply chain application built',
          ' using the Hyperledger Sawtooth blockchain platform. It maintains',
          ' a distributed ledger that records the provenance and location',
          ' of assets as they are transferred among various agents in a',
          ' supply chain.'),
        m('p',
          m('em', 'This web app'),
          ' demonstrates this functionality ',
          ' . It tracks the provenance and location of products',
          ' as they are transported to and from different intermediary.'),
        m('p',
          'To use ',
          m('em', 'this app'),
          ', create a new agent using the Log in/Sign up link on the navbar',
          ' above. Once logged in, you will be able to register a product',
          ' on the blockchain, update its location, and transfer',
          ' ownership of the product to other registered agents.'))
    ]
  }
}

module.exports = Dashboard
