// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import Button from "@material-ui/core/Button";
import "jest-dom/extend-expect";
import { TestWrapper } from "../utils";
import { StyleWrapper } from "./index";

afterEach(cleanup);

test("render style wrapper", () => {
	const { container } = render(
		<TestWrapper>
			<StyleWrapper>
				<Button color="primary">Primary</Button>
				<Button
					variant="raised"
					color="secondary">
					Secondary
				</Button>
			</StyleWrapper>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});
