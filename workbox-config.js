module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,html,js,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/sw.js'
};