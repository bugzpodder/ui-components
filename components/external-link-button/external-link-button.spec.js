// @flow
import React from "react";
import { render } from "react-testing-library";
import { TestWrapper } from "@grail/components/components";
import { ExternalLinkButton } from "./external-link-button";

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
