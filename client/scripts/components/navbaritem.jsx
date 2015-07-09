/* global React, window */

'use strict';

window.NavbarItem = React.createClass({
    displayName: 'NavbarItem',
    propTypes: {
        isActive: React.PropTypes.bool,
        name: React.PropTypes.string.isRequired,
        path: React.PropTypes.string.isRequired
    },

    render: function() {
        return (<li className={ this.props.isActive ? 'active' : null }>
                   <a href={ this.props.path }>{ this.props.name }</a>
               </li>);
    }
});
