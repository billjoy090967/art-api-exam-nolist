require('dotenv').config()

const PouchDB = require('pouchdb')
const pkGen = require('./lib/build-pk')
const { prop, assoc, toLowerCase, replace } = require('ramda')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

const addPainting = painting => {
  painting._id = pkGen('painting', '_', painting.name)
  return db.put(painting)
}

const getPainting = id => db.get(id)
const updatePainting = painting => db.put(painting)
const deletePainting = id => db.get(id).then(painting => db.remove(painting))

const addArtist = artist => {
  artist._id = pkGen('artist', '_', artist.artist)
  return db.put(artist)
}

const getArtist = id => db.get(id)
const updateArtist = artist => db.put(artist)
const deleteArtist = id => db.get(id).then(artist => db.remove(artist))

module.exports = {
  addPainting,
  getPainting,
  updatePainting,
  deletePainting,
  addArtist,
  getArtist,
  updateArtist,
  deleteArtist
}
