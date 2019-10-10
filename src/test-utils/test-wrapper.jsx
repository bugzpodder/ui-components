// @flow
import React, { type Node } from "react";
// $FlowFixMe: there is no createGenerateClassName export in @material-ui/core/styles
import { createGenerateClassName } from "@material-ui/styles";
/* eslint-disable import/no-extraneous-dependencies */
import { JssProvider } from "react-jss";
import { StyleWrapper } from "../style-wrapper";

type Props = {
  children: Node<*>,
};

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true,
});

class MockResizeObserver {
  observe = () => {};
  disconnect = () => {};
}

window.ResizeObserver = MockResizeObserver;

export const TestWrapper = (props: Props) => {
  const { children } = props;
  return (
    <JssProvider generateClassName={generateClassName}>
      <StyleWrapper>{children}</StyleWrapper>
    </JssProvider>
  );
};
