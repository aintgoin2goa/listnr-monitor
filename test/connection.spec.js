'use strict';
require("babel/register");
var expect = require('chai').expect;
var fetchMock = require('fetch-mock');

describe('Connection', function(){

	var connection;

	before(function(){
		connection = require('../src/js/connection');
	});

	it('Should ping the given url to keep checking the connection');

	it('Should expose the current connection state');

	it('Should fire an event when the connection state changes');

});
