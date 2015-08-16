'use strict';
const React = require('react');
const connection = require('../connection');

const GuidDisplay = React.createClass({

	getInitialState : function(){
		return {guid : ''}
	},

	componentDidMount : function(){
		connection.onConnection(function(data){
			this.setState({guid:data.guid});
		}.bind(this));
	},

	render : function(){
		console.log('render', this.state);
		return (
			<p className="guid">{this.state.guid}</p>
		);
	}
});

module.exports = GuidDisplay;
