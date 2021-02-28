import React from "react";
import gql from "graphql-tag";
import { SubscriptionInfoNotification } from "./SubscriptionInfoNotification";
import { WIDGETS_QUERY } from "../queries";

export const WIDGET_DELETED_SUBSCRIPTION = gql`
  subscription WidgetDeleted {
    widgetDeleted {
      id
      name
    }
  }
`;

export const WidgetDeletedSubscription = () => (
  <SubscriptionInfoNotification
    subscription={WIDGET_DELETED_SUBSCRIPTION}
    refetchQueries={[{ query: WIDGETS_QUERY }]}
  >
    {({ widgetDeleted: { name } }) => (
      <span>A widget named {name} was deleted!</span>
    )}
  </SubscriptionInfoNotification>
);
