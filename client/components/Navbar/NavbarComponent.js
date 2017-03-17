import { Navbar, NavItem, Nav } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router';
import styles from './Navbar.scss';

export default class Navigation extends React.Component {
  render() {
    return (
      <section>
        <Navbar className={styles.root} collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/' className={styles.navItem}>Nobodys Stories</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey='1' href='#' componentClass='span'><Link to='/signup' className={styles.navItem}>Sign up</Link></NavItem>
              <NavItem eventKey='2' href='#' componentClass='span'><Link to='/login' className={styles.navItem}>Login</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </section>
    );
  }
}
