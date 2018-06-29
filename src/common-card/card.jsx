//@flow
import React, { type Node } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { MAIN_CARD_ELEVATION } from "@grail/lib";
import classNames from "classnames";
import styles from "./common-card.module.scss";

type Props = {
	/** The content provide to the card's body */
	children: Node,
	/** Provides the card's Title */
	title?: Node,
	/** An avatar for the card */
	avatar?: Node,
	/** Provides for action components to be rendered at the bottom of `CommonCard` */
	footerActions?: Node,
	/** Provides for action components to be rendered in the top right corner */
	headerActions?: Node,
	/** Provides a subheader under the `title` */
	subheader?: string,
	/** Provides built-in margins for the card */
	hasMargin?: boolean,
	/** Provides classnames to the card and its subcomponents
	 * options include `header`, `headerActions` (applied to headerActions container), `title`, `subheader`, `body` (for card's contents),
	 * `footer`, and `footerActions` (applied to footerActions container) */
	classes?: CommonCardClasses,
	/** DEPRECATED: Gives a `className` to the `Card` */
	className?: string,
	/** DEPRECATED: Gives a `className` to the container of `CommonCard`s contents */
	contentClass?: string,
	/** DEPRECATED: Provides a className to `footerActions` */
	footerClass?: string,
	/** DEPRECATED: Provides a className to `headerActions` */
	headerClass?: string,
};

/**
 * `CommonCard` provides a component to create basic Material-UI Cards.
 * This was made in order to standardize how we implement cards across UIs.
 */
export const CommonCard = (props: Props) => {
	const {
		classes = {},
		children,
		footerActions = null,
		headerActions = null,
		subheader = "",
		avatar = null,
		title = "",
		hasMargin = false,

		// TODO(nsawas): deprecate old classnames
		className = "",
		contentClass = "",
		footerClass = "",
		headerClass = "",
		...cardProps
	} = props;
	return (
		<Card
			{...cardProps}
			className={classNames(className, classes.root, styles.card, { [styles.withMargin]: hasMargin })}
			elevation={MAIN_CARD_ELEVATION}
		>
			{(title || headerActions) && (
				<CardHeader
					data-testid="card-header"
					title={title}
					subheader={subheader}
					classes={{
						root: classNames(classes.header, headerClass),
						action: classNames(styles.headerActions, classes.headerActions),
						title: classNames("card-title", classes.title),
						subheader: classes.subheader,
					}}
					avatar={avatar}
					action={headerActions}
				/>
			)}
			<CardContent
				data-testid="card-content"
				classes={{
					root: classNames(classes.body, contentClass),
				}}
			>
				{children}
			</CardContent>
			{footerActions && (
				<CardActions
					data-testid="card-actions"
					classes={{
						root: classNames(classes.footer, footerClass),
						action: classes.footerActions,
					}}
				>
					{footerActions}
				</CardActions>
			)}
		</Card>
	);
};
