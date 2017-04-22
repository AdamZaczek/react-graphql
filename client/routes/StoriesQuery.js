import Relay from 'react-relay';

/**
 * #3 - Relay routes
 * Define a root GraphQL query into which your
 * containers' query fragments will be composed.
 *
 * To learn more about Relay routes, visit:
 *   https://facebook.github.io/relay/docs/guides-routes.html
 */
class UsersRoute extends Relay.Route {
  static routeName = 'Users';  // A unique name
  static queries = {
    greetings: Component => Relay.QL`
      query UsersQuery {
        greetings {
          ${Component.getFragment('Users')},
        },
      }
    `,
  };
}

export default UsersRoute;
