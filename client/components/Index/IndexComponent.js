import React, { Component, PropTypes } from 'react';


export default class IndexComponent extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    })),
  }

  render() {
    return (
      <div>
        <span>Handcrafted with ♥ by Adam Żaczek</span>
        {this.props.users}
      </div>
    );
  }
}
