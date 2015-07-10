/* global React, document, Router, Navbar, Account, Login */

'use strict';

var Main = React.createClass({
    displayName: 'MainApplication',

    getInitialState: function () {
        return {
            currentPage: 'Home',
            loggedIn: false
        };
    },

    componentDidMount: function () {
        var setState = this.setState;
        var router = Router({
            '/': setState.bind(this, {currentPage: 'Home'}),
            '/account': setState.bind(this, {currentPage: 'Account'}),
            '/login': setState.bind(this, {currentPage: 'Login'}),
            '/account/logout': setState.bind(this, {currentPage: 'Logout'}),
            '/nickname': setState.bind(this, {currentPage: 'Nickname'})
        });

//      this is kind of screwey, but should really work.
//      router.configure({ html5history: true });

        router.init('/');
    },

    render: function() {
        var currentPage = {};

        switch(this.state.currentPage) {
            case 'Account':
                currentPage = <Account />;
                break;
            case 'Login':
                currentPage = <Login />;
                break;
            default:
                currentPage = null;
                break;
        }

        var pages = [
            {
                name: 'Home',
                path: '#/'
            },
            {
                name: 'Account',
                path: '#/account'
            }
        ];

        if(this.state.loggedIn) {
            pages.push({ name: 'Logout', path: '#/logout' });
        }
        else {
            pages.push({ name: 'Login', path: '#/login' });
        }

        return (
            <div>
                <Navbar currentPage={ this.state.currentPage } pages={ pages } />
                <div className="container-fluid">
                    <div className="row">
                        <div className="main">
                            { currentPage }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Main />, document.getElementById('body'));
