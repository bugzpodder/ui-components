import React, { ReactNode } from "react";

export const getListboxElement = (
  footer: ReactNode,
): React.ForwardRefExoticComponent<
  React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLUListElement>
> => {
  return React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLElement>>(
    (props, ref) => {
      const { children, ...otherProps } = props;
      return (
        <ul ref={ref} data-testid="items" {...otherProps}>
          {children}
          {footer}
        </ul>
      );
    },
  );
};
