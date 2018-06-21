module.exports = {
	presets: [["@babel/preset-env", { useBuiltIns: "usage" }], "@babel/preset-flow", "@babel/preset-react"],
	plugins: ["transform-class-properties"],
};
