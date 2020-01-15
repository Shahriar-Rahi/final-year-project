'use strict'

const FLOAT_PRECISION = 1000000

const toInt = num => parseInt(parseFloat(num) * FLOAT_PRECISION)

module.exports = {
  toInt
}
