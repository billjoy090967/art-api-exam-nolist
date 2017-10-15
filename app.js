require('dotenv').config()
const express = require('express')
const app = express()
const nodeHTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const {
  isEmpty,
  path,
  join,
  prop,
  omit,
  not,
  merge,
  compose,
  __
} = require('ramda')
const {
  getPainting,
  updatePainting,
  addPainting,
  deletePainting
} = require('./dal')
const bodyParser = require('body-parser')
const checkRequiredFields = require('./lib/check-required-fields')

app.use(bodyParser.json())

app.get('/', function(req, res, next) {
  res.send('Welcome to the Art API. Manage all the paintings for much win.')
})

///POST PAINTING///
app.post('/paintings', (req, res, next) => {
  if (isEmpty(prop('body', req))) {
    return next(
      new HTTPError(
        400,
        'Missing request body.  Content-Type header should be application/json.'
      )
    )
  }

  const body = compose(
    omit(['_id', '_rev']),
    merge(__, { type: 'painting' }),
    prop('body')
  )(req)

  const missingFields = checkRequiredFields(
    ['name', 'movement', 'artist', 'yearCreated', 'museum'],
    prop('body', req)
  )

  if (not(isEmpty(missingFields))) {
    return next(
      new HTTPError(
        400,
        `Missing Required Fields: ${join(', ', missingFields)}`
      )
    )
  }

  addPainting(body)
    .then(painting => res.status(201).send(painting))
    .catch(err => next(new HTTPError(err.status, err.message)))
})

///GET PAINTING///
app.get('/paintings/:id', (req, res, next) => {
  const paintingID = path(['params', 'id'], req)
  getPainting(paintingID)
    .then(painting => res.status(200).send(painting))
    .catch(err =>
      next(
        new nodeHTTPError(err.status, err.message, {
          description: 'This is not in the database'
        })
      )
    )
})

///UPDATE A PAINTING///
app.put('/paintings/:id', (req, res, next) => {
  if (req.params.id === req.body._id) {
    const checkResults = checkRequiredFields(
      ['name', 'movement', 'artist', 'yearCreated', 'museum'],
      prop('body', req)
    )
    if (isEmpty(checkResults)) {
      updatePainting(prop('body', req))
        .then(updatedPaintingResult =>
          res.status(200).send(updatedPaintingResult)
        )
        .catch(err =>
          next(
            new nodeHTTPError(err.status, err.message, {
              description: 'Didnt Update'
            })
          )
        )
    } else {
      return next(
        new nodeHTTPError(
          400,
          `Missing Required Fields in Request Body: ${join(', ', checkResults)}`
        )
      )
    }
  } else {
    return next(
      new nodeHTTPError(400, 'Painting id in path does not match_id in body.')
    )
  }
})
///DELETE A PAINTING///
app.delete('/paintings/:id', (req, res, next) =>
  deletePainting(path(['params', 'id'], req))
    .then(deleteResponse => res.status(200).send(deleteResponse))
    .catch(err => next(new nodeHTTPError(err.status, err.message)))
)

app.use(function(err, req, res, next) {
  console.log('ERROR!', err)
  res.status(err.status || 500).send(err)
})

app.listen(port, () => console.log('Historic Paintings on port', port))
