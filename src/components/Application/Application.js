import './Application.less';
import React, { PropTypes, Component } from 'react';
import { LoginModal } from '../index';

export default class Application extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
        <div>
          <LoginModal />
          <div className="container">
            {this.props.children}
          </div>
        </div>
    );
  }
}

