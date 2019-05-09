const express = require('express');
const helmet = require('helmet');

const dishesRouter = require('../dishes/dish-router');
const recipesRouter = require('../recipes/recipe-router');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/dishes', dishesRouter);
server.use('/api/recipes', recipesRouter);

module.exports = server;