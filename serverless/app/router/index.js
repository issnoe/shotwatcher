'use strict'

const Router = require('koa-router')
const files = require('../controllers/files'

module.exports = function () {
        var router = new Router({
            prefix: '/api'
        })
        router.get('/files', files.populate)
        return router
    }