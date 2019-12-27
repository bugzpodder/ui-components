import React from "react";
import { StyleWrapper } from "../style-wrapper";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

// TODO(nsawas): Figure out why this new method of disabling global styles
// isnt exactly working. For now we disable all styles with `disableGeneration` prop below.
const generateClassName = createGenerateClassName({
  disableGlobal: true,
});

class MockResizeObserver {
  observe = (): void => {};
  disconnect = (): void => {};
}

(window as any).ResizeObserver = MockResizeObserver;

export const TestWrapper: React.FC = props => {
  const { children } = props;
  return (
    <StylesProvider disableGeneration generateClassName={generateClassName}>
      <StyleWrapper>{children}</StyleWrapper>
    </StylesProvider>
  );
};
