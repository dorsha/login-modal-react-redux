import './Login.less';
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { login } from '../../actions/application';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: null, password: null, loginFailed: false, timestamp: new Date() };
  }

  handleInputChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { location, modalCallback, dispatch, history } = this.props;

    var successCallback;
    var failureCallback;
    if (!modalCallback) {
      successCallback = () => {
        // success login - redirect to a secure page
        const nextPath = location.state.nextPathname || '/';
        history.pushState({}, nextPath);
      };
      failureCallback = () => {
        // fail to login
        this.setState({loginFailed: true});
      };
    } else {
      successCallback = modalCallback;
    }

    var form = this.state;
    dispatch(login(form, successCallback, failureCallback));
    this.setState({ user: null, password: null, timestamp: new Date() });
  }

  render() {
    var fieldClass = classNames({
      'field': true,
      'error': this.state.loginFailed
    });

    var errClass = classNames({
      'ui': true,
      'error': true,
      'message': true,
      'visible': this.state.loginFailed
    });

    return (
        <div className="ui one column center aligned grid">
          <div className="column six wide form-holder">
            <form
                className="ui large form"
                onSubmit={this.handleSubmit.bind(this)}
                onChange={this.handleInputChange.bind(this)}>
              <fieldset className="ui stacked segment">
                <div className="ui small header">I am a demo, you can type any username/password</div>
                <div className={fieldClass}>
                  <div className="ui left icon input">
                    <i className="user icon" />
                    <input key={this.state.timestamp} name="user" type="text" placeholder="Username" required/>
                  </div>
                </div>
                <div className={fieldClass}>
                  <div className="ui left icon input">
                    <i className="lock icon" />
                    <input key={this.state.timestamp} name="password" type="password" placeholder="Password" required/>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="ui button large fluid teal">
                    Login
                  </button>
                </div>
              </fieldset>
              <div className={errClass}><span>Login Failed</span></div>
            </form>
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  location: React.PropTypes.object,
  modalCallback: React.PropTypes.func,
  dispatch: React.PropTypes.func,
  history: React.PropTypes.object
};

export default connect()(Login);

