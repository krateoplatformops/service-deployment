const express = require('express')
const router = express.Router()

router.delete('/', async (req, res, next) => {
  try {
    throw new Error('Not implemented')
  } catch (error) {
    next(error)
  }
})

module.exports = router
