import gql from "graphql-tag";

export const AddData = gql`
  mutation addTodoData($item: String!) {
    addTodoData(item: $item) {
      item
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;
