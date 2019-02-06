'use strict';

const serverless = require('serverless-http');

require('babel-register')
const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
app.use(logger())
app.use(bodyParser())
const router = require('./app/router')()
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000)
//quit for compile serverless
//module.exports.main = serverless(app);

