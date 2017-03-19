import React from 'react';
import 'normalize.css/normalize.css';
import Navbar from '../Navbar/NavbarComponent';
// import Footer from '../Footer/FooterContainer';
import styles from './App.scss';

export default class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.root}>
        <Navbar />
        <div className={styles.greeting}>
          <h1 className={styles.sawasdee}>Hello there!</h1>
          <p>If you could actually learn relay, that would be great!</p>
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
