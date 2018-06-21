// @flow
import React from "react";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "../typeahead.module.scss";

type Suggestion = {
	query: string,
	isHighlighted: boolean,
};

export const suggestionComponent = (suggestion: string, { query, isHighlighted }: Suggestion) => {
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);
	return (
		<MenuItem
			selected={isHighlighted}
			component="div">
			<div>
				{parts.map((part, index) => {
					return part.highlight ? (
						<span
							key={String(index)}
							className={styles.highlighted}>
							{part.text}
						</span>
					) : (
						<strong
							key={String(index)}
							className={styles.notHighlighted}>
							{part.text}
						</strong>
					);
				})}
			</div>
		</MenuItem>
	);
};
