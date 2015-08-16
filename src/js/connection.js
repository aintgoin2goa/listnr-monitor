'use strict';
require('whatwg-fetch');
require('es6-promise').polyfill();
const eventEmitter = new (require('events').EventEmitter)();
const Peer = require('peerjs');
const guid = require('./lib/guid');
const getUserMedia = require('./lib/getUserMedia');
const events = {
	STATE_CHANGE : 'connection.stateChange',
	CONNECTION : 'connection.connected'
};

const connectionStates = {
	NOT_CONNECTED : 'NOT_CONNECTED',
	NO_INTERNET : 'NO_INTERNET',
	NETWORK_ERROR : 'NETWORK_ERROR',
	NO_RECEIVER : 'NO_RECEIVER',
	CONNECTED : 'CONNECTED',
	ERROR : 'ERROR'
};

var currentState = connectionStates.NOT_CONNECTED;

function updateCurrentState(state){
	if(state !== currentState){
		eventEmitter.emit(events.STATE_CHANGE, state);
		currentState = state;
	}
}

function getCurrentState(){
	return currentState;
}

function connect(){
	var generatedGuid = guid();
	var peer = new Peer(generatedGuid, {key: '1uyi3xryfsqncdi'});
	peer.on('open', function(){
		console.log('open');
		updateCurrentState(connectionStates.NO_RECEIVER);
		eventEmitter.emit(events.CONNECTION, {guid:generatedGuid});
	});
	peer.on('connection', function(con){
		console.log('received connection request');
		if(currentState === connectionStates.CONNECTED){
			console.log('already connectected.  Bailing...');
			return;
		}

		getUserMedia({audio:true, video:false}, function(stream){
			let call = peer.call(con.peer, stream);
			call.on('stream', function(){
				updateCurrentState(connectionStates.CONNECTED);
				console.log('Connected to peer');
			}, function(err){
				console.error(err);
				currentState = connectionStates.ERROR;
			});
		});
	});
	peer.on('error', function(err){
		console.error(err);
		if(err.type == 'network'){
			updateCurrentState(connectionStates.NETWORK_ERROR);
		}else{
			updateCurrentState(connectionStates.ERROR);
		}
	})
}

module.exports = {
	init : () => {
		connect()
	},
	onStateChange : (func) => eventEmitter.on(events.STATE_CHANGE, func),
	onConnection : (func) => eventEmitter.on(events.CONNECTION, func),
	getCurrentState : getCurrentState,
	states : connectionStates
};



