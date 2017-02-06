import Relay from 'react-relay';
import IndexComponent from './IndexComponent';

export default Relay.createContainer(IndexComponent, {
  fragments: {
/*
    stories: () => Relay.QL`
      fragment on customStoriesQuery {
        title
        content
      }
    }`
*/
  }
});
