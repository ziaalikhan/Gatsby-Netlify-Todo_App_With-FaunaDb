import gql from "graphql-tag";

export const TODOLISTDATA = gql`
  {
    AllTodoData {
      id
      item
    }
  }
`;
