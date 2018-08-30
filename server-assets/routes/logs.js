let router = require('express').Router()
let Logs = require('../models/log')

//GET ALL
router.get('/api/logs', (req, res, next) => {
  Logs.find({})
    .then(logs => {
      res.status(200).send(logs)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Get User Logs
router.get('api/userlogs', (req, res) => {
  Logs.find({ author: req.session.uid })
    .then(logs => {
      res.status(200).send(logs)
    })
})

router.delete('api/logs/:logId', (req, res) => {
  Logs.findById(req.params.logId)
    .then(log => {
      if (log.author != req.session.uid) {
        res.status(401).send('Cannot Delete Logs that are not yours')
      }
      log.remove(() => {
        res.status(200).send('DELORTED')
      })
    })
})