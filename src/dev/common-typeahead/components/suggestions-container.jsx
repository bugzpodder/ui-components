//@flow
import React from "react";
import Paper from "@material-ui/core/Paper";

export const suggestionsContainer = (props: Object) => {
	const { containerProps, children } = props;
	return (
		<Paper
			square
			{...containerProps}>
			{children}
		</Paper>
	);
};
