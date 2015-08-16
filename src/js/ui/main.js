'use strict';
const React = require('react');
const ActivityMonitor = require('./activity');
const GuidDisplay = require('./guid');

module.exports = {
	init : () => {
		React.render(
			<GuidDisplay/>,
			document.getElementById('guid')
		);
		React.render(
			<ActivityMonitor/>,
			document.getElementById('activity')
		);
	}
};
