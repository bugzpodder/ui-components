// @flow
import React from "react";
import moment from "moment";
import classNames from "classnames";
import styles from "./timeline-graph.module.scss";

type Props = {
	/* rows of date stamped data. */
	rows: Array<TimelineRow>,
	/* Optional Selection */
	selectedRowIndex?: number,
	onSelectRow?: number => any,
	/* Optional date format */
	dateFormat?: string,
	/* Optional card width */
	cardWidth?: "narrow" | "wide",
	/* Optional card height */
	cardHeight?: "short" | "tall",
	shouldSort?: boolean,
};

/**
 * Generates a timeline graph to represent date-stamped data in reverse
 * cronological order.
 * Optionally, provides a way to select a datum.
 */
export const TimelineGraph = (props: Props) => {
	const {
		rows,
		selectedRowIndex,
		onSelectRow,
		dateFormat,
		cardWidth = "wide",
		cardHeight = "short",
		shouldSort = true,
	} = props;
	shouldSort && rows.sort(({ date: leftDate }, { date: rightDate }) => leftDate.localeCompare(rightDate)).reverse();
	const isWideCard = cardWidth === "wide";
	const isTallCard = cardHeight === "tall";
	const svgYMargin = 40;
	const rectYMargin = 20;
	const rectXOffset = 20;
	const rectWidth = isWideCard ? 240 : 160;
	const rowHeight = isTallCard ? 120 : 80;
	const timelinePathFinialSize = 6;
	return (
		<div className={`${styles.timelineGraph} card-width-${cardWidth} card-height-${cardHeight}`}>
			<svg
				height={rowHeight * rows.length + svgYMargin + rectYMargin}
				className={styles.timelineSvg}
			>
				<defs>
					<filter
						id="drop-shadow"
						x="0"
						y="0"
						width="200%"
						height="200%"
					>
						<feGaussianBlur
							in="SourceAlpha"
							stdDeviation="3"
						/>
						<feOffset
							dx="2"
							dy="2"
							result="offsetblur"
						/>
						<feComponentTransfer>
							<feFuncA
								type="linear"
								slope="0.5"
							/>
						</feComponentTransfer>
						<feMerge>
							<feMergeNode />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				{rows.map((row, rowIndex) => {
					const { columns, date } = row;
					const rectHeight = rowHeight - rectYMargin;
					const rectTop = rowIndex * rowHeight + rectYMargin / 2;
					return (
						<g
							key={rowIndex}
							data-row-index={rowIndex}
							transform={`translate(20, ${svgYMargin})`}
							className={selectedRowIndex === rowIndex ? styles.isSelected : ""}
						>
							<path
								d={`
									M0,${rectTop - rectYMargin}
									l0,${(rowHeight + rectYMargin) / 2}
									l${rectXOffset},0
									m-${rectXOffset},0
									l0,${(rowHeight + rectYMargin) / 2}
								`}
								className={styles.timelinePath}
							/>
							{rowIndex === 0 && (
								<circle
									cx={0}
									cy={rectTop - rectYMargin}
									r={timelinePathFinialSize}
									className={styles.timelinePathFinial}
								/>
							)}
							{rowIndex === rows.length - 1 && (
								<rect
									x={-timelinePathFinialSize}
									y={rectTop + rowHeight - timelinePathFinialSize}
									width={timelinePathFinialSize * 2}
									height={timelinePathFinialSize * 2}
									className={styles.timelinePathFinial}
								/>
							)}
							<g
								transform={`translate(${rectXOffset}, ${rectTop})`}
								onClick={() => onSelectRow && onSelectRow(rowIndex)}
								className={onSelectRow ? `${styles.isSelectable} card-container` : ""}
							>
								<rect
									x={0}
									y={0}
									width={rectWidth}
									height={rectHeight}
									className={styles.timelineBlock}
									filter="url(#drop-shadow)"
								/>
								<g className={classNames(`timeline-item-${rowIndex}`, styles.timelineBlockContent)}>
									{columns.map((column, index) => {
										return (
											<g
												key={index}
												data-column-index={index}
												transform={`translate(${(index * rectWidth) / 3 + 10}, 0)`}
											>
												{column.map((field, index) => {
													const yOffset = rectHeight / (1 + column.length);
													const yMargin = 16 * (index - (column.length - 1) / 2);
													return (
														<text
															key={index}
															data-field-index={index}
															className={classNames(`timeline-text-${index}`, styles.text)}
															y={yOffset * (index + 1) + yMargin}
														>
															{field}
														</text>
													);
												})}
											</g>
										);
									})}
									{dateFormat && (
										<text
											className={styles.date}
											x={rectWidth}
											y={rectHeight / 2}
										>
											{`${moment(date).format(dateFormat)}`}
										</text>
									)}
								</g>
							</g>
						</g>
					);
				})}
			</svg>
		</div>
	);
};
