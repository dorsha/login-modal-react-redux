import './Archive.less';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { archive } from '../../actions/application';
import { archivedSelector } from '../../selectors/application';

class Archive extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    archived: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  onArchive() {
    const { dispatch } = this.props;
    dispatch(archive());
  }

  render() {
    const { archived } = this.props;

    const archiveText = 'Click on the Archive button (you should get a login popup)';
    let archiveSuccessText = '';
    let archivedLabel = '';
    if (archived) {
      archiveSuccessText = 'Archived original request was successfully called.';
      archivedLabel = <a className="ui pointing green basic label">Archived Successfully</a>
    }

    return (
        <div>
          <div className="ui huge header">Archive</div>
          <div className="ui small header">{archiveText}</div>
          <div className="ui small header">{archiveSuccessText}</div>
          <button title="Archive"
                  className="circular ui basic icon button"
                  onClick={this.onArchive.bind(this)}>
            <i className="icon archive"/>
          </button>
          <div>
            {archivedLabel}
          </div>
        </div>
    );
  }
}

export default connect(archivedSelector)(Archive);
