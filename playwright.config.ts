import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3137);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "./test-results",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: `pnpm start --port ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } }
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], viewport: { width: 1280, height: 800 } }
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], viewport: { width: 1024, height: 768 } }
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 } }
    }
  ]
});
