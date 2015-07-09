/* global React, window, NavbarItem */

'use strict';

function getPageList(pages, currentPage) {
    var pageList = [];

    pages.forEach(function(item) {
        pageList.push(
            <NavbarItem
                key={ item.name }
                name={ item.name }
                path={ item.path }
                isActive={ item.name === currentPage }
            />);
    });

    return pageList;
}

window.Navbar = React.createClass({
    displayName: 'Navbar',
    propTypes: {
        currentPage: React.PropTypes.string,
        pages: React.PropTypes.array
    },

    render: function() {
        var pageList = getPageList(this.props.pages, this.props.currentPage);

        return (<nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#navbar"
                            aria-expanded="false"
                            aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#/">OFTC IRC Services</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        { pageList }
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li ng-className="{active: isActive('/account/login')}" ng-hide="loggedIn">
                            <a href="#/account/login">Login</a>
                        </li>
                        <li ng-show="loggedIn"><a href="#/account/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>);
    }
});
