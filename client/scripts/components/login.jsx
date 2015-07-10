/* global React, window, $, localStorage */

'use strict';

window.Login = React.createClass({
    displayName: 'Account',
    propTypes: {
    },

    getInitialState: function() {
        return {
            username: '',
            password: '',
            errorMessage: ''
        };
    },

    usernameChanged: function(event) {
        this.setState({ username: event.target.value });
    },

    passwordChanged: function(event) {
        this.setState({ password: event.target.value });
    },

    submitForm: function(event) {
        event.preventDefault();

        var data = {
            nickname: this.state.username,
            password: this.state.password
        };

        $.post('/api/account/login', data, function(ret, status) {
            if(status === 'success' && !ret.error) {
                this.setState({ errorMessage: '' });
                localStorage.setItem('token', ret.token);
                window.location = '#/account';
            }
            else {
                this.setState({ errorMessage: ret.error || 'An error occured' });
            }
        }.bind(this));
    },

    render: function() {
        var errorMessage = null;

        if(this.state.errorMessage) {
            errorMessage = (<div className="form-group">
                               <div className="has-error">{ this.state.errorMessage }</div>
                           </div>);
        }

        return (<form className="form-horizontal" onSubmit={ this.submitForm }>
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="nickname">IRC Nickname</label>
                <div className="col-sm-5">
                    <input type="text" className="form-control" id="nickname" placeholder="Enter services nickname"
                        value={ this.state.username } onChange={ this.usernameChanged }/>
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-3 control-label" htmlFor="password">Password</label>
                <div className="col-sm-5">
                    <input type="password" className="form-control" id="password" placeholder="Enter services password"
                        value={ this.state.password } onChange={ this.passwordChanged }/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-sm-offset-3 col-sm-3">
                    <button type="submit" className="btn btn-default">Submit</button>
                </div>
            </div>
            { errorMessage }
        </form>);
    }
});
