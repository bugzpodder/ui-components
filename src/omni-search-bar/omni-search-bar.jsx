// @flow
import React, { Fragment } from "react";
import width from "dom-helpers/query/width";
import {
	OMNI_KEY,
	OMNI_ERROR,
	getOmniTextFromSearchValues,
	getSearchValuesFromOmniText,
	getSearchOptions,
	getQuery,
	updateQuery,
	isValueValid,
} from "@grail/lib";
import { OmniField } from "./components/omni-field";
import { OmniDropdown } from "./components/omni-dropdown";
import styles from "./omni.module.scss";

type Props = {
	/** Defines the search parameters. */
	searchDefs: SearchDefs,
	/** Handles a request to search. */
	setSearchOptions: ({ searchOptions: SearchOptionsV2 }) => any,
	/** Takes a `node` to include in the omni dropdown after the search fields */
	children?: React$Node,
} & NavProps;

type State = {
	isOpen: boolean,
	omniText: string,
	error: string,
	searchValues: SearchValues,
};

/**
 * Provides a search input that maps to provided search options and
 * populates a dropdown with fields to the individual options.
 */
export class OmniSearchBar extends React.Component<Props, State> {
	state: State = {
		isOpen: false,
		omniText: "",
		error: "",
		searchValues: new Map(),
	};
	componentDidMount = async () => {
		const { location } = this.props;
		// FIXME(jrosenfield): Move to componentDidUpdate
		const query = getQuery({ location });
		const omniText = query[OMNI_KEY];
		if (!isValueValid(omniText)) {
			return null;
		}
		await this.updateOmniText(omniText);
		this.onSearch();
	};
	toggleDropdown = () => {
		this.setState(prevState => {
			return { isOpen: !prevState.isOpen };
		});
	};
	// FIXME(jrosenfield): shouldn't push to history if query is unchanged
	updateOmniText = (omniText: string, shouldUpdateBrowserHistory: boolean = false) => {
		return new Promise(resolve => {
			this.setState(() => {
				const { searchDefs } = this.props;
				try {
					const searchValues = getSearchValuesFromOmniText(searchDefs, omniText);
					updateQuery(
						this.props,
						{ [OMNI_KEY]: omniText },
						{
							shouldUpdateBrowserHistory,
						},
					);
					return {
						omniText,
						searchValues,
						error: "",
					};
				} catch (error) {
					if (error.name === OMNI_ERROR) {
						return { omniText: omniText, error: error.message };
					}
					throw error;
				}
			}, resolve);
		});
	};
	onSearch = () => {
		this.setState({ isOpen: false });
		// FIXME(jrosenfield): does ApiQueryHandler change location or just define setSearchOptions?
		this.props.setSearchOptions({ searchOptions: getSearchOptions(this.props.searchDefs, this.state.searchValues) });
	};
	handleClear = () => {
		this.updateOmniText("");
	};
	onChange = (id: string, value: SearchValue) => {
		let omniText = value;
		if (id !== OMNI_KEY) {
			const index = parseInt(id.split("-").pop());
			const searchValues: SearchValues = new Map(this.state.searchValues).set(index, value);
			omniText = getOmniTextFromSearchValues(this.props.searchDefs, searchValues);
		}
		// $FlowFixMe: omniText is a string
		this.updateOmniText(omniText);
	};
	componentDidUpdate = async (prevProps: Props) => {
		const omniText = getQuery({ location: this.props.location })[OMNI_KEY];
		const prevOmniText = getQuery({ location: prevProps.location })[OMNI_KEY];
		if (!isValueValid(omniText)) {
			return null;
		}
		if (prevOmniText !== omniText) {
			await this.updateOmniText(omniText);
		}
	};

	anchorEl = null;

	render = () => {
		const { searchDefs, children } = this.props;
		const { isOpen } = this.state;
		return (
			<Fragment>
				{isOpen && <div
					id={`${OMNI_KEY}-clickaway`}
					className={styles.clickAwayLayer}
					onClick={this.toggleDropdown} />}
				<div
					className={styles.omniBar}
					ref={node => {
						this.anchorEl = node;
					}}
				>
					<OmniField
						omniText={this.state.omniText}
						onChange={this.onChange.bind(this)}
						onSearch={() => {
							this.onSearch();
						}}
						onClear={this.handleClear}
						error={this.state.error}
						isOpen={isOpen}
						toggleDropdown={this.toggleDropdown}
					/>
					{isOpen && (
						<div
							id={`${OMNI_KEY}-dropdown`}
							className={styles.omniDropdown}>
							<OmniDropdown
								searchDefs={searchDefs}
								searchValues={this.state.searchValues}
								onSearch={() => {
									this.onSearch();
								}}
								onChange={this.onChange.bind(this)}
								onClear={this.handleClear}
								width={width(this.anchorEl, true)}
							>
								{children}
							</OmniDropdown>
						</div>
					)}
				</div>
			</Fragment>
		);
	};
}
