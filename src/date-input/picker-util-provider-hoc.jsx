// @flow
import React from "react";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

export function wrapPickerUtilProvider<P>(WrappedComponent: React$ComponentType<P>): React$ComponentType<P> {
	return class extends React.Component<P> {
		render = () => {
			return (
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<WrappedComponent {...this.props} />
				</MuiPickersUtilsProvider>
			);
		};
	};
}
