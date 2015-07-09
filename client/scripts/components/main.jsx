/* global React, document, Router, Navbar */

'use strict';

var app = app || {};

var MainApplication = React.createClass({
    displayName: 'MainApplication',

    getInitialState: function () {
        return {
            currentPage: 'Home'
        };
    },

    componentDidMount: function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {currentPage: 'Home'}),
            '/account': setState.bind(this, {currentPage: 'Account'}),
            '/account/login': setState.bind(this, {currentPage: 'Login'}),
            '/account/logout': setState.bind(this, {currentPage: 'Logout'}),
            '/nickname': setState.bind(this, {currentPage: 'Nickname'})
        });

//      this is kind of screwey, but should really work.
//      router.configure({ html5history: true });

        router.init('/');
    },

    render: function() {
        return (
            <Navbar currentPage={ this.state.currentPage } pages={[
                {
                    name: 'Home',
                    path: '#/'
                },
                {
                    name: 'Account',
                    path: '#/account'
                } ]} />
        );
    }
});

React.render(<MainApplication />, document.getElementById('body'));
