'use strict'

const m = require('mithril')
const _ = require('lodash')

const forms = require('../components/forms')
const api = require('../services/api')

const agentSubmitter = state => e => {
  e.preventDefault()

  const agentKeys = ['name', 'password']
  const agent = _.pick(state, agentKeys)

  api.post('agents', agent)
    .then(res => api.setAuth(res.authorization))
    .then(() => m.route.set('/'))
    .catch(api.alertError)
}

const SignupForm = {
  view (vnode) {
    const setter = forms.stateSetter(vnode.state)

    return m('.signup-form', [
      m('form', { onsubmit: agentSubmitter(vnode.state) },
      m('legend', 'Create Agent'),
      forms.textInput(setter('name'), 'Name'),
      forms.passwordInput(setter('password'), 'Password'),
      m('.container.text-center',
        'Or you can ',
        m('a[href="/login"]',
          { oncreate: m.route.link },
          'login as an existing Agent')),
      m('.form-group',
        m('.row.justify-content-end.align-items-end',
          m('col-2',
            m('button.btn.btn-primary',
              'Create Agent')))))
    ])
  }}

module.exports = SignupForm
