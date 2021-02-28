import gql from "graphql-tag";

export const WIDGETS_QUERY = gql`
  query WidgetsQuery {
    toolName @client
    widgets {
      id
      name
      description
      color
      size
      price
      quantity
    }
  }
`;
