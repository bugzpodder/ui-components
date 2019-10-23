// @flow
import React, { type Node } from "react";
// $FlowFixMe: there is no createGenerateClassName export in @material-ui/core/styles
import { StyleWrapper } from "../style-wrapper";
import { StylesProvider, createGenerateClassName } from "@material-ui/styles";

type Props = {
  children: Node<*>,
};

// TODO(nsawas): Figure out why this new method of disabling global styles
// isnt exactly working. For now we disable all styles with `disableGeneration` prop below.
const generateClassName = createGenerateClassName({
  disableGlobal: true,
});

class MockResizeObserver {
  observe = () => {};
  disconnect = () => {};
}

window.ResizeObserver = MockResizeObserver;

export const TestWrapper = (props: Props) => {
  const { children } = props;
  return (
    <StylesProvider
      disableGeneration
      generateClassName={generateClassName}
    >
      <StyleWrapper>{children}</StyleWrapper>
    </StylesProvider>
  );
};
