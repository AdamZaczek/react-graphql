import { Navbar, NavItem, Nav } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router';
import styles from './Navbar.scss';

export default class Navigation extends React.Component {
  render() {
    return (
      <section>
        <Navbar className={styles.root}>
          <Nav>
            <NavItem eventKey='1' href='#'><Link to='/signup' className={styles.navItem}>Sign up</Link></NavItem>
            <NavItem eventKey='2' href='#'><Link to='/login' className={styles.navItem}>Login</Link></NavItem>
          </Nav>
        </Navbar>
      </section>
    );
  }
}
