// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "../utils";
import { Alert } from "./index";

afterEach(cleanup);

test("render success alert pane", () => {
	const { container, getByTestId } = render(
		<TestWrapper>
			<div>
				<Alert
					color="success"
					message="Test success" />
			</div>
		</TestWrapper>,
	);
	expect(getByTestId("alert")).toHaveTextContent("Test success");
	expect(container).toMatchSnapshot();
});

test("render info alert pane", () => {
	const { container, getByTestId } = render(
		<TestWrapper>
			<div>
				<Alert
					color="info"
					message="Test info" />
			</div>
		</TestWrapper>,
	);
	expect(getByTestId("alert")).toHaveTextContent("Test info");
	expect(container).toMatchSnapshot();
});

test("render warning alert pane", () => {
	const { container, getByTestId } = render(
		<TestWrapper>
			<div>
				<Alert
					color="warning"
					variant="flat"
					message="Test warning" />
			</div>
		</TestWrapper>,
	);
	expect(getByTestId("alert")).toHaveTextContent("Test warning");
	expect(container).toMatchSnapshot();
});

test("render error alert pane", () => {
	const { container, getByTestId } = render(
		<TestWrapper>
			<div>
				<Alert
					variant="flat"
					message="Test error" />
			</div>
		</TestWrapper>,
	);
	expect(getByTestId("alert")).toHaveTextContent("Test error");
	expect(container).toMatchSnapshot();
});
