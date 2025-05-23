/**
 * External dependencies
 */
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * WordPress dependencies
 */
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

module.exports = {
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