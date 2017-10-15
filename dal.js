require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const { prop, assoc, toLowerCase, replace } = require('ramda')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

const addPainting = painting => {
  painting._id = pkGen('painting', '_', painting.name)
  //return add(painting)
  return db.put(painting)
}

const getPainting = id => db.get(id)
const updatePainting = painting => db.put(painting)
const deletePainting = id => db.get(id).then(painting => db.remove(painting))

module.exports = { addPainting, getPainting, updatePainting, deletePainting }
