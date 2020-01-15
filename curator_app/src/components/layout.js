'use strict'

const m = require('mithril')
const _ = require('lodash')

// Basis for info fields with headers
const labeledField = (header, field) => {
  return m('.field-group.mt-5', header, field)
}

const fieldHeader = (label, ...additions) => {
  return m('.field-header', [
    m('span.h5.mr-3', label),
    additions
  ])
}

// Simple info field with a label
const staticField = (label, info) => labeledField(fieldHeader(label), info)

/**
 * Returns a header styled to be a page title
 */
const title = title => m('h3.text-center.mb-3', title)

/**
 * Returns a row of any number of columns, suitable for placing in a container
 */
const row = columns => {
  if (!_.isArray(columns)) {
    columns = [columns]
  }
  return m('.row', columns.map(col => m('.col-md', col)))
}

module.exports = {
  title,
  row,
  staticField
}
