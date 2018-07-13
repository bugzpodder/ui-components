// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import { CommonSwitch } from "@grail/components";
import { TestWrapper } from "../utils";

afterEach(cleanup);

const mockChange = jest.fn();

test("render primary common switch", () => {
	const { container } = render(
		<TestWrapper>
			<div>
				<CommonSwitch
					label="Primary"
					color="primary"
					helperText="test switch"
					value="test"
					onChange={mockChange}
				/>
			</div>
		</TestWrapper>,
	);
	// fireEvent.click(getByTestId("common-switch"));
	// expect(mockChange).toHaveBeenCalled();
	expect(container).toMatchSnapshot();
});

test("render secondary common switch", () => {
	const { container } = render(
		<TestWrapper>
			<div>
				<CommonSwitch
					isEnabled
					onChange={mockChange}
				/>
			</div>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});

test("render error common switch", () => {
	const { container } = render(
		<TestWrapper>
			<div>
				<CommonSwitch
					showError
					isSelected
					onChange={mockChange}
				/>
			</div>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});
