import './Application.less';
import React from 'react';
import { LoginModal } from '../index';

export default class Application extends React.Component {

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

Application.propTypes = {
  children: React.PropTypes.any
};
