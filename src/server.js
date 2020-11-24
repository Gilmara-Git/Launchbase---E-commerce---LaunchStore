
const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const methodOverride = require("method-override")
const session = require('./config/session')
const server = express()

server.user(session)
server.use(express.urlencoded({ extended: true})) /* Allow req.body to be posted  */
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set('view engine', 'njk')


nunjucks.configure('src/app/views', { 
    express: server, 
    autoescape: false,
    noCache:true
 })



 server.listen(5000, function () {

    console.log('I am the LaunchStore server')


})
