import React from 'react';
import PropTypes from 'prop-types';

export default class Async extends React.Component {
  componentWillMount() {
    this.cancelUpdate = false;
    this.props.load.then(c => { 
      this.C = c;
      if (!this.cancelUpdate) this.forceUpdate();
    });
  }
  componentWillUnmount(){
    this.cancelUpdate = true;
  }
  render() {
    return this.C
      ? this.C.default
        ? <this.C.default {...this.props.componentProps} />
        : <this.C {...this.props.componentProps} />
      : null;
  }
}

Async.propTypes = {
  load: PropTypes.instanceOf(Promise).isRequired,
  componentProps: PropTypes.object
};
