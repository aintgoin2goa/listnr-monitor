'use strict';
require('babel/register');
const connection = require('./connection');
const ui = require('./ui/main');
connection.init();
ui.init();
