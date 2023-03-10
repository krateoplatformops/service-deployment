const express = require('express')
const router = express.Router()
const k8sHelpers = require('../service-library/helpers/k8s.helpers')
const { k8sConstants } = require('../service-library/constants')
const responseHelpers = require('../service-library/helpers/response.helpers')
const { deploymentConstants } = require('../constants')

router.get('/', async (req, res, next) => {
  try {
    const list = await k8sHelpers.getList(
      '/apis/krateo.io/v1alpha1/deployments'
    )

    res.status(200).json({ list: list.map((t) => responseHelpers.parse(t)) })
  } catch (error) {
    next(error)
  }
})

router.get('/:uid', async (req, res, next) => {
  try {
    const exists = await k8sHelpers.getList(
      '/apis/krateo.io/v1alpha1/deployments',
      `deploymentId=${req.params.uid}`
    )

    if (!exists || exists.length === 0) {
      res
        .status(404)
        .json({ message: `Deployment ${req.params.uid} not found` })
      return
    }

    res.status(200).json(responseHelpers.parse(exists[0]))
  } catch (error) {
    next(error)
  }
})

module.exports = router
