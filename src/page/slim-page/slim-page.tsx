import Paper from "@material-ui/core/Paper";
import PollyfillObserver from "resize-observer-polyfill";
import React, {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./slim-page.module.scss";
import { ClickableItem } from "../../types/dropdown";
import { HeaderAction, SlimPageClasses } from "../../types/card";
import { HeaderActions } from "./components/header-actions";
import { SpinnerOverlay } from "../../spinner-overlay";
import { TitleComponent } from "./components/title-component";

// useContentRectWidth is a custom react hook that gets the rectangle of the ref provided. The function must start
// with `use` in order to be considered a hook, and to use `useState` and `useEffect` internally.
// @ts-ignore ResizeObserver does not exist on window.
const WindowObserver = window.ResizeObserver || PollyfillObserver;
const useContentRectWidth = (
  ref: MutableRefObject<HTMLDivElement> | MutableRefObject<null>,
): number => {
  const currentRef = ref.current;
  const [contentRectWidth, setContentRectWidth] = useState(
    currentRef ? currentRef.getBoundingClientRect().width : 0,
  );
  useEffect(() => {
    if (!currentRef) {
      return (): void => {};
    }
    const observer = new WindowObserver(entries => {
      // We need to disconnect the observer and call observe upon requesting the animation
      // frame to prevent exceeding the call limit of ResizeObserver.
      // This is a known issue with the ResizeObserver: https://github.com/WICG/ResizeObserver/issues/38.
      observer.disconnect();
      setContentRectWidth(Math.floor(entries[0].contentRect.width));
      requestAnimationFrame(() => observer.observe(currentRef));
    });
    observer.observe(currentRef);
    return (): void => observer.disconnect();
  }, [currentRef]);
  return contentRectWidth;
};

type Props = {
  /** Page title */
  title?: ReactNode;
  /** Subtitle shown under the `title` */
  subtitle?: ReactNode;
  /**
   *
   * ClassNames for the page and its sub-components. Options include:
   *
   *  - `root`
   *
   *  - `centerHeader`
   *
   *  - `header` (applied to entire header container which contains headerActions, title, subtitle, and special actions)
   *
   *  - `headerActions` (applied to the container around the header actions)
   *
   *  - `primaryActions`
   *
   *  - `secondaryActions`
   *
   *  - `titleContainer` (applied to the container around the title and subtitle)
   *
   *  - `title`
   *
   *  - `subtitle`
   *
   *  - `content` - (applied to the container around the content)
   */
  classes?: SlimPageClasses;
  /** `Node` displayed in the center of the header. For example, page tabs. */
  centerHeader?: ReactNode;
  /** Takes a `node` to show on the page */
  children?: ReactNode;
  /** Displays a non-interactive loading animation */
  isLoading?: boolean;
  /** Primary actions to display on the header */
  primaryActions?: HeaderAction[];
  /** Secondary actions to display in the secondary actions menu */
  secondaryActions?: ClickableItem[];
};

/**
 * `SlimPage` provides a component for a page with a flush card header.
 * Note: if you are using this component
 * in a new environment, we recommend building a new child component for your
 * environment; take a look at the `LimsPageV2` component as an example.
 */
export const SlimPage: React.FC<Props> = props => {
  const {
    classes = {},
    subtitle = "",
    title = "",
    children,
    primaryActions = [],
    secondaryActions = [],
    centerHeader,
    isLoading = false,
    ...cardProps
  } = props;
  const hasChildren = Array.isArray(children)
    ? children.filter(child => child).length > 0
    : !!children;
  const titleRef = useRef(null);
  const headerActionsRef = useRef(null);

  // By getting the rectangle of each edge (left/right) header item we can accurately find out which item is wider.
  // Then, a placeholder div of exactly that size is inserted on the inside of the shorter item in order to accurately
  // center the centerHeader div.
  const titleWidth = useContentRectWidth(titleRef);
  const headerActionsWidth = useContentRectWidth(headerActionsRef);
  const sizeDifference = titleWidth - headerActionsWidth;
  const isTitleBiggerThanHeaderActions = sizeDifference > 0;
  const isHeaderActionsBiggerThanTitle = sizeDifference < 0;

  return (
    <div
      className={classNames(classes.root, styles.pageContainer)}
      data-testid="common-page"
    >
      <Paper
        square
        data-testid="common-page-header"
        classes={{
          root: classNames(
            classes.header,
            styles.stickyHeader,
            styles.pageHeader,
          ),
        }}
        {...cardProps}
      >
        <TitleComponent
          ref={titleRef}
          title={title}
          classes={classes}
          subtitle={subtitle}
        />
        {centerHeader && isHeaderActionsBiggerThanTitle && (
          <div
            className={styles.placeHolder}
            style={{ maxWidth: -sizeDifference }}
          />
        )}
        {centerHeader && (
          <div
            className={classNames(styles.centerHeader, classes.centerHeader)}
          >
            {centerHeader}
          </div>
        )}
        {centerHeader && isTitleBiggerThanHeaderActions && (
          <div
            className={styles.placeHolder}
            style={{ maxWidth: sizeDifference }}
          />
        )}
        <HeaderActions
          ref={headerActionsRef}
          classes={classes}
          primaryActions={primaryActions}
          secondaryActions={secondaryActions}
        />
      </Paper>
      {hasChildren && (
        <div
          data-testid="common-page-content"
          className={classNames(styles.content, classes.content)}
        >
          {children}
        </div>
      )}
      <SpinnerOverlay isActive={isLoading} />
    </div>
  );
};
