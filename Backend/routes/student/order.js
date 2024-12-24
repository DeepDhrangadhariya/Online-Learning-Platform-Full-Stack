const express = require("express")
const orderCtrl = require('../../controller/student/orderCtrl')
const routes = express.Router()

routes.post('/create', orderCtrl.createOrder)
routes.post('/capture', orderCtrl.capturePaymentAndFinalizeOrder)

module.exports = routes