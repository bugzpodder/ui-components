// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import { TestWrapper } from "../utils";
import { GrailLogo } from "./index";

afterEach(cleanup);

[undefined, "white", "purple", "gold"].forEach(color => {
	test(`render ${color ? color : "default (white)"} GrailLogo`, () => {
		const { container } = render(
			<TestWrapper>
				<GrailLogo color={color} />
			</TestWrapper>,
		);
		expect(container).toMatchSnapshot();
	});
});
