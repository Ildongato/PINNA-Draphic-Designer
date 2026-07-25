import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "test-results/**",
      "playwright-report/**",
      "test-artifacts/**"
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
