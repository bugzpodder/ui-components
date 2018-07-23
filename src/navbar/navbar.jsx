// @flow
import React from "react";
import { BaseNavbar } from "../dev/base-navbar/base-navbar";

type Props = {
	/** Determines whether to put warning banner above the navigation bar. */
	isProduction?: boolean,
	/** Defines the title of the page to display. */
	title?: string,
	/** Defines the breadcrumbs to go underneath the navbar. */
	breadcrumbs?: React$Node,
	/** Defines the content aligned left on the navbar to the right of menu button. */
	left?: React$Node,
	/** Defines the content centered in the navbar to the right of menu button. */
	center?: React$Node,
	/** Defines the content aligned right in the navbar to the right of menu button. */
	right?: React$Node,
	/** Defines domain in which links should be routed. */
	domain: Symbol,
	/** Defines links to use for external domains. */
	externalDomains: Map<Symbol, string>,
	/** Overrieds lib/constants with items to populate the sidebar. */
	sidebarContent?: (SidebarItem | ParentSidebarItem)[],
	/** Defines the footer of the sidebar. */
	sidebarFooter?: React$Node,
	/** Defines the component to handle routing to internal links. */
	InternalLinkComponent?: React$ElementType,
	/** Defines the pathname. */
	currentPath: string,
};

type State = {
	isSidebarOpen: boolean,
};

export class Navbar extends React.Component<Props, State> {
	state = {
		isSidebarOpen: false,
	};

	toggleSidebar = () => {
		this.setState(({ isSidebarOpen }) => ({ isSidebarOpen: !isSidebarOpen }));
	};

	render = () => {
		return (
			<BaseNavbar
				sidebarVariant="temporary"
				isSidebarOpen={this.state.isSidebarOpen}
				toggleSidebar={this.toggleSidebar}
				{...this.props}
			/>
		);
	};
}
