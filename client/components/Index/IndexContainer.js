import { createFragmentContainer, graphql } from 'react-relay';
import IndexComponent from './IndexComponent';

// need to check how this plural works
export default createFragmentContainer(IndexComponent, {
  users: graphql`
  fragment email on usersQuery {
    usersQuery {
      email
    }
  }
  `
    // users: () => Relay.QL`
    //   fragment usersQuery {
    //     email,
    //   }
    // `,
});
// export default createFragmentContainer(TodoList, {
//   viewer: graphql`
//     fragment TodoList_viewer on Viewer {
//       allTodoes(last: 1000) {
//         edges {
//           node {
//             id,
//             complete,
//             ...Todo_todo,
//           },
//         },
//       },
//       ...Todo_viewer,
//     }
//   `,
// })
