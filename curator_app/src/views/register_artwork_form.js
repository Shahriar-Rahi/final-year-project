'use strict'

const m = require('mithril')
const _ = require('lodash')
const L = require('leaflet')

const api = require('../services/api')
const parsing = require('../services/parsing')
const forms = require('../components/forms')
const layout = require('../components/layout')

const recordSubmitter = state => e => {
  e.preventDefault()

  const recordKeys = ['latitude', 'longitude', 'record_id']
  const record = _.pick(state, recordKeys)
  record.latitude = parsing.toInt(record.latitude)
  record.longitude = parsing.toInt(record.longitude)

  api.post('records', record)
    .then(() => m.route.set('/artworks'))
    .catch(api.alertError)
}

const RegisterArtworkForm = {
  view (vnode) {
    const setter = forms.stateSetter(vnode.state)
    return m('.register-form', [
      m('form', { onsubmit: recordSubmitter(vnode.state) },
      m('legend', 'Register Artwork'),
      forms.textInput(setter('record_id'), 'Record ID'),
      layout.row([
        forms.group('Latitude', forms.field(setter('latitude'), {
          type: 'number',
          step: 'any',
          min: -90,
          max: 90,
        })),
        forms.group('Longitude', forms.field(setter('longitude'), {
          type: 'number',
          step: 'any',
          min: -180,
          max: 180,
        }))
      ]),
      m('.form-group',
        m('.row.justify-content-end.align-items-end',
          m('col-2',
            m('button.btn.btn-primary',
              'Register Artwork')))))
    ])
  }
}

module.exports = RegisterArtworkForm
