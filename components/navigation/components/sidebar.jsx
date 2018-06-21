// @flow
import React from "react";
import pathToRegexp from "path-to-regexp";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { CollapsableListItem, ExternalLink } from "@grail/components/components";
import { sidebarItems } from "@grail/lib/constants";
import styles from "./sidebar.module.scss";

type Props = {
	isOpen: boolean,
	toggle: Function,
	domain: Symbol,
	externalDomains: Map<Symbol, string>,
	sidebarContent: (SidebarItem | ParentSidebarItem)[],
	InternalLinkComponent?: React$ElementType,
	footer?: React$Node,
	currentPath: string,
};

type State = {
	openItems: Set<number>,
	touchedItems: Set<number>,
};

export class Sidebar extends React.Component<Props, State> {
	state = {
		openItems: new Set(),
		touchedItems: new Set(),
	};

	componentDidUpdate = (prevProps: Props, prevState: State) => {
		if (this.props !== prevProps && prevState.touchedItems.size) {
			this.setState({ touchedItems: new Set() });
		}
	};

	getLink = (item: SidebarItem, key: number, nested: boolean = false) => {
		const { exact = false, domain: itemDomain, path, name } = item;
		const { currentPath, domain, InternalLinkComponent } = this.props;
		if (InternalLinkComponent !== undefined && itemDomain === domain) {
			const active = pathToRegexp(path, [], { end: exact }).test(currentPath);
			return (
				<ListItem
					key={key}
					component={InternalLinkComponent}
					to={item.path}
					exact={exact.toString()}
					button
					className={classNames({ [styles.active]: active, [styles.nested]: nested })}
					dense={nested}
					disableRipple
				>
					<ListItemText primary={name} />
				</ListItem>
			);
		}
		const domainString = this.props.externalDomains.get(itemDomain) || "";
		return (
			<ListItem
				key={key}
				component={ExternalLink}
				href={`${domainString}${path}`}
				button
				className={classNames({ [styles.nested]: nested })}
				dense={nested}
				disableRipple
				onClick={event => {
					event.stopPropagation();
				}}
			>
				<ListItemText primary={item.name} />
			</ListItem>
		);
	};

	getIsOpen = (
		index: number,
		{ sidebarContent = sidebarItems, domain, currentPath }: Props = this.props,
		state: State = this.state,
	): boolean => {
		if (state.openItems.has(index) || state.touchedItems.has(index)) {
			return state.openItems.has(index);
		}
		// $FlowFixMe: getIsOpen is called on ParentSidebarItem and returns false otherwise
		const children = sidebarContent[index].children;
		if (children === undefined) {
			return false;
		}
		return children.some(child => {
			const { domain: childDomain, exact = false, path } = child;
			if (childDomain === domain) {
				return pathToRegexp(path, [], { end: exact }).test(currentPath);
			}
			return false;
		});
	};

	toggleCollapsableListItem = (index: number) => {
		this.setState((prevState: State, props: Props) => {
			const touchedItems = new Set(prevState.touchedItems || []);
			const openItems = new Set(prevState.openItems);
			if (this.getIsOpen(index, props, prevState)) {
				openItems.delete(index);
			} else {
				openItems.add(index);
			}
			if (!prevState.touchedItems.has(index)) {
				touchedItems.add(index);
				return { openItems, touchedItems };
			}
			return { openItems };
		});
	};

	renderItem = (item: SidebarItem | ParentSidebarItem, index: number) => {
		if (item.children !== undefined) {
			const isOpen = this.getIsOpen(index);
			return (
				<CollapsableListItem
					key={index}
					isOpen={isOpen}
					toggleList={this.toggleCollapsableListItem.bind(this, index)}
					headerText={item.name}
				>
					{/* $FlowFixMe item is ParentSidebarItem if item.children is defined.*/
					item.children.map((childItem, childIndex) => {
						return this.getLink(childItem, index * 1000 + childIndex, true);
					})}
				</CollapsableListItem>
			);
		}
		// $FlowFixMe if item.children is undefined it must be type SidebarItem.
		return this.getLink(item, index);
	};

	render() {
		const { sidebarContent = sidebarItems, footer, isOpen, toggle } = this.props;
		return (
			<Drawer
				id="sidebar-drawer"
				anchor="left"
				open={isOpen}
				transitionDuration={0}
				onClose={toggle}>
				<IconButton
					id="close-sidebar"
					onClick={toggle}>
					<ArrowBack />
				</IconButton>
				<Divider />
				<div
					tabIndex={0}
					role="button"
					onClick={event => {
						if (
							event.ctrlKey ||
							event.shiftKey ||
							event.metaKey || // apple
							(event.button && event.button === 1) // middle click, >IE9 + everyone else
						) {
							return;
						}
						toggle();
					}}
					className={styles.drawer}
				>
					<List className={styles.list}>{sidebarContent.map(this.renderItem)}</List>
				</div>
				<div className={styles.drawerFooter}>
					<Divider />
					{footer}
				</div>
			</Drawer>
		);
	}
}
