//@flow
import React, { type Node } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { MAIN_CARD_ELEVATION } from "@grail/lib";
import styles from "./common-card.module.scss";

type Props = {
	/** The content provide to the card's body */
	children: Node,
	/** Provides the card's Title */
	title?: Node,
	/** An avatar for the card */
	avatar?: Node,
	/** Gives a `className` to the `Card` */
	className?: string,
	/** Provides for action components to be rendered at the bottom of `CommonCard` */
	footerActions?: Node,
	/** Provides a className to `footerActions` */
	footerClass?: string,
	/** Gives a `className` to the container of `CommonCard`s contents */
	contentClass?: string,
	/** Provides for action components to be rendered in the top right corner */
	headerActions?: Node,
	/** Provides a className to `headerActions` */
	headerClass?: string,
	/** Provides a subheader under the `title` */
	subheader?: string,
	/** Provides built-in margins for the card */
	hasMargin?: boolean,
};

/**
 * `CommonCard` provides a component to create basic Material-UI Cards.
 * This was made in order to standardize how we implement cards across UIs.
 */
export const CommonCard = (props: Props) => {
	const {
		children,
		className = "",
		contentClass = "",
		footerActions = null,
		footerClass = "",
		headerActions = null,
		headerClass = "",
		subheader = "",
		avatar = null,
		title = "",
		hasMargin = false,
		...cardProps
	} = props;
	return (
		<Card
			{...cardProps}
			className={`${styles.card} ${hasMargin ? styles.withMargin : ""} ${className}`}
			elevation={MAIN_CARD_ELEVATION}
		>
			{(title || headerActions) && (
				<CardHeader
					data-testid="card-header"
					title={title}
					subheader={subheader}
					classes={{
						action: styles.headerActions,
						root: headerClass,
						title: `${title}-card-title`,
					}}
					avatar={avatar}
					action={headerActions}
				/>
			)}
			<CardContent
				data-testid="card-content"
				className={contentClass}>
				{children}
			</CardContent>
			{footerActions && (
				<CardActions
					data-testid="card-actions"
					className={footerClass}>
					{footerActions}
				</CardActions>
			)}
		</Card>
	);
};
