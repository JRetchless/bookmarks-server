const express = require('express')
const uuid = require('uuid/v4')
const logger = require('../logger')
const store = require('../../store')

const bookmarksRouter = express.Router()
const bodyParser = express.json()

bookmarksRouter
  .route('/bookmarks')
  .get((req, res) => {
    res.json(store.bookmarks)
  })
  .post(bodyParser, (req, res) => {

    const { title, url, description, rating } = req.body

    
    if(!title){
        logger.error(`Title is required`)
        return res.status(400).send(`Invalid Data`);
    }

    if(!rating){
        logger.error(`Rating is required`)
        return res.status(400).send(`Invalid Data`);
    }

    if(!url){
        logger.error(`url is required`)
        return res.status(400).send(`Invalid Data`);
    }


    if (isNaN(rating) || rating < 0 || rating > 5) {
      logger.error(`rating must be a number between 0 and 5`)
      return res.status(400).send(`rating must be a number between 0 and 5`)
    }

    const bookmark = {id: uuid(), title, url, description, rating }

    store.bookmarks.push(bookmark)

    logger.info(`Bookmark with id ${bookmark.id} has been created!`)
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark)
})

bookmarksRouter
  .route('/bookmarks/:bookmarkId')
  .get((req, res) => {
    const {bookmarkId} = req.params

    const bookmark = store.bookmarks.find(c => c.id == bookmarkId)

    if (!bookmark) {
      logger.error(`Bookmark with id ${bookmarkId} not found.`)
      return res
        .status(404)
        .send('Bookmark Not Found')
    }

    res.json(bookmark)
  })
  .delete((req, res) => {
    const {bookmarkId} = req.params

    const bookmarkIndex = store.bookmarks.findIndex(b => b.id === bookmarkId)

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${bookmarkId} not found.`)
      return res
        .status(404)
        .send('Bookmark Not Found')
    }

    store.bookmarks.splice(bookmarkIndex, 1)

    logger.info(`Bookmark with id ${bookmarkId} deleted.`)
    res
      .status(204)
      .end()
  })

module.exports = bookmarksRouter
