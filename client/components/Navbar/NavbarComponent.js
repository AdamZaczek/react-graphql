import React from 'react';
import { Link } from 'react-router';
import styles from './Navbar.scss';

export default class Navbar extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <section>
          <ul>
            <li>
              <Link to='/signup'>Sign up</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}
