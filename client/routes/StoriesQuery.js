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
    Users: Component => Relay.QL`
      query usersQuery {
        usersQuery {
          ${Component.getFragment('users')},
        },
      }
    `,
  };
}

export default UsersRoute;
