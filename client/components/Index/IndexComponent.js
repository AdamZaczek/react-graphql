import React from 'react';

export default class IndexComponent extends React.Component {
  render() {
    return (
      <div>
        <span>Handcrafted with ♥ by Adam Żaczek</span>
        {this.props.users}
      </div>
    );
  }
}
