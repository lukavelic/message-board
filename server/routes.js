const routes = require('express').Router();
const { register, login, msg } = require('./controllers')

routes.post('/register', register);
routes.post('/login', login);
routes.post('/chat/send', msg);

module.exports = routes;