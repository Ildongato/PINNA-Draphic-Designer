import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "_next/**",
      "_not-found/**",
      "404/**",
      "brand/**",
      "node_modules/**",
      "coverage/**",
      "images/**",
      "test-results/**",
      "playwright-report/**",
      "test-artifacts/**",
      "test/**",
      "work/**",
      "404.html",
      "index.html"
    ]
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      "@next/next/no-img-element": "off"
    }
  }
];

export default eslintConfig;
