import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import { ToolHeader, WidgetTable, WidgetForm } from "./components";

import {
  WidgetInsertedSubscription,
  WidgetDeletedSubscription,
} from "./subscriptions";
import { WIDGETS_QUERY } from "./queries";

const INSERT_WIDGET_MUTATION = gql`
  mutation InsertWidget($widget: InsertWidget) {
    insertWidget(widget: $widget) {
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

const DELETE_WIDGET_MUTATION = gql`
  mutation DeleteWidget($widgetId: ID) {
    deleteWidget(widgetId: $widgetId) {
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

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <WidgetInsertedSubscription />
        <WidgetDeletedSubscription />
        <Query query={WIDGETS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return "Error...";

            return (
              <Mutation mutation={DELETE_WIDGET_MUTATION}>
                {(mutateDeleteWidget) => {
                  const deleteWidget = (widgetId) => {
                    return mutateDeleteWidget({
                      variables: { widgetId },
                      refetchQueries: () => [{ query: WIDGETS_QUERY }],
                    });
                  };

                  return (
                    <React.Fragment>
                      <ToolHeader headerText={data.toolName} />
                      <WidgetTable
                        widgets={data.widgets}
                        onDeleteWidget={deleteWidget}
                      />
                    </React.Fragment>
                  );
                }}
              </Mutation>
            );
          }}
        </Query>
        <Mutation mutation={INSERT_WIDGET_MUTATION}>
          {(mutateInsertWidget) => {
            const insertWidget = (widget) => {
              return mutateInsertWidget({
                variables: { widget },
                refetchQueries: () => [{ query: WIDGETS_QUERY }],
              });
            };

            return (
              <WidgetForm
                buttonText="Add Widget"
                onSubmitWidget={insertWidget}
              />
            );
          }}
        </Mutation>
      </React.Fragment>
    );
  }
}
