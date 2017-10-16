require('dotenv').config()
const PouchDB = require('pouchdb')
const db = new PouchDB(process.env.COUCHDB_URL + process.env.COUCHDB_NAME)

const artists = [
  {
    _id: 'artist_vincent_van_gogh',
    name: 'The Starry Night',
    type: 'author',
    movement: 'post-impressionism',
    artist: 'Vincent van Gogh',
    yearCreated: 1889,
    museum: { name: 'Museum of Modern Art', location: 'New York' }
  },
  {
    _id: 'artist_claude_monet',
    name: 'Water Lilies Nympheas',
    type: 'author',
    movement: 'impressionism',
    artist: 'Claude Monet',
    yearCreated: 1907,
    museum: { name: 'Art Gallery of Ontario', location: 'Toronto' }
  },
  {
    _id: 'artist_leonardo_da_Vinci',
    name: 'The Last Supper',
    type: 'author',
    movement: 'Renaissance',
    artist: 'Leonardo da Vinci',
    yearCreated: 1495,
    museum: { name: 'Santa Maria delle Grazie', location: 'Milan' }
  },
  {
    _id: 'artist_georges_seurat',
    name: 'A Sunday Afternoon on the Island of La Grande Jatte',
    type: 'author',
    movement: 'impressionism',
    artist: 'Georges Seurat',
    yearCreated: 1884,
    museum: { name: 'Art Institute of Chicago', location: 'Chicago' }
  },
  {
    _id: 'artist_pablo_picasso',
    name: 'Guernica',
    type: 'author',
    movement: 'surrealism',
    artist: 'Pablo Picasso',
    yearCreated: 1937,
    museum: {
      name: 'Museo Nacional Centro de Arte Reina Sofía',
      location: 'Madrid'
    }
  },
  {
    _id: 'artist_pierre_auguste_renoires',
    name: 'Bal du moulin de la Galette',
    type: 'author',
    movement: 'impressionism',
    artist: 'Pierre-Auguste Renoires',
    yearCreated: 1876,
    museum: { name: 'Musée d’Orsay', location: 'Paris' }
  }
]

db
  .bulkDocs(artists)
  .then(function(result) {
    // handle possible successful future promised result
    console.log('SUCCESS!', result)
  })
  .catch(function(err) {
    //handle
    console.log(err)
  })
