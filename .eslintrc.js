module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  extends: ["airbnb", "angular", "prettier"],
  rules: {
    // outdated recomendation
		"angular/typecheck-array": "off",
		"angular/json-functions": "off",
		"angular/typecheck-string": "off",
		"angular/typecheck-object": "off",
    // anti-pattern for a single value
		"prefer-destructuring": "off",
    // anti-pattern for literals which are unchanged by pure coincidence
		"prefer-const": "off",
    // prefer not to use console.log (at least in prod); do allow warn/error though
    "no-console": ["error", { allow: ["warn", "error"] }],
    "angular/log": ["error", { allow: ["warn", "error"] }],
	},
	ignorePatterns: ["app-prod/*"],
};
