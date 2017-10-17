const { keys, difference } = require('ramda')

module.exports = (reqFields, rqstBody) => difference(reqFields, keys(rqstBody))
