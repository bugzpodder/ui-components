// @flow
import React from "react";
import { render, cleanup } from "react-testing-library";
import { TestWrapper } from "../utils";
import { ExternalLinkButton } from "./external-link-button";

afterEach(cleanup);

test("render ExternalLink", () => {
	const { container } = render(
		<TestWrapper>
			<ExternalLinkButton
				href="https://www.grail.com"
				className="test">
				GRAIL
			</ExternalLinkButton>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});
