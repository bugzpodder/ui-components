const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	components: "src/**/*.jsx",
	pagePerSection: true,
	require: [
		path.join(__dirname, "styleguide/setup.js"),
		path.join(__dirname, "..", "lims/client/public/material/material.css"),
	],
	showCode: true,
	showUsage: true,
	skipComponentsWithoutExample: true,

	updateExample: function(props, exampleFilePath) {
		if (typeof props.settings.file === "string") {
			const {
				settings: { file },
			} = props;
			delete props.settings.file;
			const filePath = path.resolve(exampleFilePath, "..", file);
			props.content = fs.readFileSync(filePath, { encoding: "utf-8" });
		}

		props.settings.showCode = props.content.length <= 300;

		return props;
	},
	webpackConfig: {
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: "babel-loader",
				},
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					loader: "style-loader!css-loader?modules!sass-loader",
				},
				{
					test: /\.woff2$/,
					exclude: /node_modules/,
					loader: "url-loader",
					options: {
						limit: 50000,
					},
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: "styles.css",
			}),
		],
	},
};
