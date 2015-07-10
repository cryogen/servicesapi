/* global React, window, localStorage */

'use strict';

window.Logout = React.createClass({
    displayName: 'Account',
    propTypes: {
    },

    componentWillMount: function() {
				console.info('1111');
        localStorage.removeItem('token');
        window.location = '#/';
    },

    render: function() {
        return <span>Logging you out...</span>;
    }
});
