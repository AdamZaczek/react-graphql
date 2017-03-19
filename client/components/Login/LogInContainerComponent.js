/* eslint no-console: off*/
import React from 'react';
import LogInComponent from './LogInComponent';

export default class LogInContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.processLoginForm = this.processForm.bind(this);
    this.changeLogingUser = this.changeUser.bind(this);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.type;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LogInComponent
        onSubmit={this.processLoginForm}
        onChange={this.changeLogingUser}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}
