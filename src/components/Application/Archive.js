import './Archive.less';
import React from 'react';
import { connect } from 'react-redux';
import { archive } from '../../actions/application';

export default class Archive extends React.Component {

  onArchive() {
    const { dispatch } = this.props;
    dispatch(archive());
  }

  render() {
    return (
        <div>
          <div className="ui huge header">Archive</div>
          <button title="Archive"
                  className="circular ui basic icon button"
                  onClick={this.onArchive.bind(this)}>
            <i className="icon archive"/>
          </button>
        </div>
    );
  }
}

Archive.propTypes = {
  dispatch: React.PropTypes.func
};

export default connect()(Archive);
