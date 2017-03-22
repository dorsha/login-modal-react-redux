import './LoginModal.less';
import React, { PropTypes, Component } from 'react';
import { Login } from '../index';
import { connect } from 'react-redux';
import { loginRequiredSelector } from '../../selectors/application';
import $ from 'jquery';

class LoginModal extends Component {

  static propTypes = {
    loginRequired: PropTypes.bool,
    retriesQueue: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    $('.login.ui.modal').modal('hide');
  }

  onLoginModalClose() {
    // iterate over all retries, execute them and resolve the promise
    const { retriesQueue } = this.props;
    retriesQueue.forEach((retry) => {
      retry()
        .then((data) => {
          retry.resolve(data);
        })
        .catch((ex) => {
          retry.reject(ex);
        });
    });

    // clear retries and close modal
    $('.login.ui.modal').modal('hide');
  }

  render() {
    const { loginRequired } = this.props;

    function openModal() {
      $('.login.ui.modal')
          .modal({
            detachable: false,
            closable: false,
            transition: 'vertical flip'
          })
          .modal('show')
      ;
    }

    if (loginRequired) {
      openModal();
    }

    return (
        <div className="login ui basic small modal">
          <Login modalCallback={this.onLoginModalClose.bind(this)} />
        </div>
    );
  }
}

export default connect(loginRequiredSelector)(LoginModal);
