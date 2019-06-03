// @flow
import "jest-dom/extend-expect";
import React from "react";
import { ExternalLink } from "./external-link";
import { ExternalLinkButton } from "./external-link-button";
import { TestWrapper } from "../test-utils";
import { cleanup, render } from "@testing-library/react";

afterEach(cleanup);

test("render ExternalLink", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExternalLink
        href="https://www.grail.com"
        className="test"
      >
        GRAIL
      </ExternalLink>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(getByTestId("external-link")).toBeInTheDocument();
  expect(getByTestId("external-link")).toHaveAttribute("href", "https://www.grail.com");
  expect(getByTestId("external-link")).toHaveAttribute("rel", "noopener noreferrer");
  expect(getByTestId("external-link")).toHaveAttribute("target", "_blank");
  expect(getByTestId("external-link")).toHaveTextContent("GRAIL");
});

test("render ExternalLink", () => {
  const { container, getByTestId } = render(
    <TestWrapper>
      <ExternalLinkButton
        href="https://www.grail.com"
        className="test"
      >
        GRAIL
      </ExternalLinkButton>
    </TestWrapper>,
  );
  expect(container).toMatchSnapshot();
  expect(container).toMatchSnapshot();
  expect(getByTestId("external-link-button")).toBeInTheDocument();
  expect(getByTestId("external-link-button")).toHaveAttribute("href", "https://www.grail.com");
  expect(getByTestId("external-link-button")).toHaveAttribute("rel", "noopener noreferrer");
  expect(getByTestId("external-link-button")).toHaveAttribute("target", "_blank");
  expect(getByTestId("external-link-button")).toHaveTextContent("GRAIL");
});
