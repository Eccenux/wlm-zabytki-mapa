const presets = [
  [
    "@babel/preset-env",
    {
	  // Windows XP / 2018 (~5 years)
      targets: {
        edge: "42",
        firefox: "52",
        chrome: "49",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.32.0",
    },
  ],
];

module.exports = { presets };