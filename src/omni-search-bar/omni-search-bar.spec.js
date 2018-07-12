// @flow
import React from "react";
import {
	LIKE_TEXT_SEARCH_TYPE,
	MULTI_FIELD_TEXT_SEARCH_TYPE,
	DATE_SEARCH_TYPE,
	DATETIME_SEARCH_TYPE,
} from "@grail/lib";
import { render, Simulate } from "react-testing-library";
import "dom-testing-library/extend-expect";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import { TestWrapper } from "../utils";
import { OmniSearchBar } from "./index";

const searchDefs: SearchDefs = [
	{
		id: "part",
		name: "Part Number",
		type: LIKE_TEXT_SEARCH_TYPE,
		description: "e.g. G0000",
	},
	{
		id: "lotNumber",
		name: "Lot Number",
		type: MULTI_FIELD_TEXT_SEARCH_TYPE,
		aliases: new Set(["lot"]),
		description: "Lot Num/External Ref",
		searchFields: ["lotNumber", "externalReference"],
	},
	{
		name: "Received Date",
		type: DATETIME_SEARCH_TYPE,
		searchFields: ["receivedDate"],
	},
	{
		name: "Expiration Date",
		type: DATE_SEARCH_TYPE,
		searchFields: ["expirationDate"],
	},
];

describe("OmniSearchBar", () => {
	const onSearch = jest.fn();
	const { getByPlaceholderText, container } = render(
		<TestWrapper>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<OmniSearchBar
					searchDefs={searchDefs}
					setSearchOptions={onSearch}>
					This is a test
				</OmniSearchBar>
			</MuiPickersUtilsProvider>
		</TestWrapper>,
	);
	it("renders properly", () => {
		expect(getByPlaceholderText("Search part number here or use dropdown")).toBeInTheDOM();
		expect(container).toMatchSnapshot();
	});
	it("doesn't render dropdown or clickaway", () => {
		expect(container.querySelector("#omni-clickaway")).toBeNull();
		expect(container.querySelector("#omni-dropdown")).toBeNull();
	});
	it("opens and closes dropdown & clickaway when toggled", () => {
		const dropdownButton = container.querySelector("#omni-menu");
		let clickaway = container.querySelector("#omni-clickaway");
		let dropdown = container.querySelector("#omni-dropdown");
		expect(clickaway).not.toBeInTheDOM();
		expect(dropdown).not.toBeInTheDOM();
		Simulate.click(dropdownButton);
		container.querySelector("#omni-dropdown");
		clickaway = container.querySelector("#omni-clickaway");
		dropdown = container.querySelector("#omni-dropdown");
		expect(clickaway).toBeInTheDOM();
		expect(dropdown).toBeInTheDOM();
		expect(getByPlaceholderText("e.g. G0000")).toBeInTheDOM();
		Simulate.click(clickaway);
		clickaway = container.querySelector("#omni-clickaway");
		dropdown = container.querySelector("#omni-dropdown");
		expect(clickaway).not.toBeInTheDOM();
		expect(dropdown).not.toBeInTheDOM();
		Simulate.click(dropdownButton);
		Simulate.click(dropdownButton);
		expect(dropdown).not.toBeInTheDOM();
	});
});
