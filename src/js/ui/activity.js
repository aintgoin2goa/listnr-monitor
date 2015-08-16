'use strict';
const React = require('react');
const connection = require('../connection');

const activityStates = {
	ERROR : 'error',
	DISCONNECTED : 'disconnected',
	CONNECTING : 'connecting',
	CONNECTED : 'connected'
};

function connectionStateToActivityState(connectionState){
	switch(connectionState){
		case connection.states.NETWORK_ERROR :
		case connection.states.NO_INTERNET :
		case connection.states.ERROR :
			return activityStates.ERROR;
		case connection.states.NOT_CONNECTED :
			return activityStates.DISCONNECTED;
		case connection.states.NO_RECEIVER :
			return activityStates.CONNECTING;
		case connection.states.CONNECTED :
			return activityStates.CONNECTED;
	}
}

const ActivityIndicator = React.createClass({

	getInitialState : function() {
		return {currentState:connectionStateToActivityState(connection.getCurrentState())}
	},

	componentDidMount : function() {
		connection.onStateChange(function(state){
			this.setState({currentState:connectionStateToActivityState(state)})
		}.bind(this));
	},

	render : function() {
		return (
			<div className="activity" data-state={this.state.currentState}></div>
		);
	}
});

module.exports = ActivityIndicator;
