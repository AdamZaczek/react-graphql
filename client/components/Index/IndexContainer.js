import Relay from 'react-relay';
import IndexComponent from './IndexComponent';

// need to check how this plural works
export default Relay.createContainer(IndexComponent, {
  fragments: {
    users: () => Relay.QL`
      fragment on User @relay(plural: true) {
        email,
      }
    `,
  },
});
