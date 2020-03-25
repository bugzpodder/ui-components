import React from "react";
import { StyleWrapper } from "../style-wrapper";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

// TODO(nsawas): Adjust once this issue is fixed https://github.com/mui-org/material-ui/issues/14357.
const generateClassName = createGenerateClassName({});

export const TestWrapper: React.FC = (props) => {
  const { children } = props;
  return (
    <StylesProvider generateClassName={generateClassName}>
      <StyleWrapper>{children}</StyleWrapper>
    </StylesProvider>
  );
};
