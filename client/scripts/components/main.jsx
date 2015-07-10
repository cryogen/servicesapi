/* global React, document, Router, Navbar, Account, Login, localStorage, Logout */

'use strict';

var pageMap = {
    Account: {
        markup: <Account loggedIn={ this.state.loggedIn } />,
        public: true,
        sidebarItems: {
            Details: {
                path: '#/account'
            },
            Nicknames: {
                path: '#/account/nicknames'
            },
            Certificates: {
                path: '#/account/certificates'
            }
        }
    }
};

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
            '/logout': setState.bind(this, {currentPage: 'Logout'}),
            '/nickname': setState.bind(this, {currentPage: 'Nickname'})
        });

        router.init('/');
        router.configure({ after: this.routeChanged });
    },

    routeChanged: function() {
        var token = localStorage.getItem('token');

        if(token) {
            this.setState({ loggedIn: true });
        }
        else {
            this.setState({ loggedIn: false });
        }
    },

    render: function() {
        var currentPage = {};

        switch(this.state.currentPage) {
            case 'Account':
                currentPage = <Account loggedIn={ this.state.loggedIn } />;
                break;
            case 'Login':
                currentPage = <Login loggedIn={ this.state.loggedIn } />;
                break;
            case 'Logout':
                currentPage = <Logout loggedIn={ this.state.loggedIn } />;
                break;
            default:
                currentPage = null;
                break;
        }

        var pages = [
        {
            name: 'Home',
            path: '#/'
        }];

        if(this.state.loggedIn) {
            pages.push({ name: 'Account', path: '#/account' });
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
