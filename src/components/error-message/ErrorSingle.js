import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core';

import styles from './styles';

class ErrorSingle extends PureComponent {
  render() {
    return (
      <div>
        {this.props.error !== undefined &&
          <span className={this.props.classes.helpBlock}>
            {this.props.error || ''}
          </span>
        }
      </div>
    );
  }
}

ErrorSingle.defaultProps = {
  error: undefined,
}

export default withStyles(styles)(ErrorSingle);