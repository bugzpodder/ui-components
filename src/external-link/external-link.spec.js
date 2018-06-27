// @flow
import React from "react";
import { render } from "react-testing-library";
import { TestWrapper } from "@grail/components/src/utils";
import { ExternalLink } from "./external-link";

test("render ExternalLink", () => {
	const { container } = render(
		<TestWrapper>
			<ExternalLink
				href="https://www.grail.com"
				className="test">
				GRAIL
			</ExternalLink>
		</TestWrapper>,
	);
	expect(container).toMatchSnapshot();
});
