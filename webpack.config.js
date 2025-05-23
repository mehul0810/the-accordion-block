/**
 * External dependencies
 */
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');

/**
 * WordPress dependencies
 */
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

// Extend the default config
const config = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'src/index.js'),
		frontend: path.resolve(process.cwd(), 'src/frontend.js'),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(process.cwd(), 'build'),
	},
};

// Add PostCSS configuration
const postcssLoaderOptions = defaultConfig.module.rules.find(
	(rule) => rule.test && rule.test.toString().includes('css')
).use.find((item) => item.loader && item.loader.includes('postcss-loader')).options;

// Enable nesting and imports in PostCSS
postcssLoaderOptions.postcssOptions.plugins.push('postcss-import');
postcssLoaderOptions.postcssOptions.plugins.push('postcss-nested');

// Copy block.json to root build directory
if (!config.plugins) {
	config.plugins = [];
}

config.plugins.push(
	new CopyPlugin({
		patterns: [
			{
				from: 'src/js/block/accordion-block/block.json',
				to: 'block.json',
			},
		],
	})
);

module.exports = config;