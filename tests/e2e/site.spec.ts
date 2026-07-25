import { AxeBuilder } from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { projects } from "../../src/data/projects";

test("homepage renders the required sections and project links", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "PINNA.", exact: true })).toBeVisible();
  await expect(page.locator("#services > p").filter({ hasText: /^Services$/ })).toBeVisible();
  await expect(page.locator("#process > p").filter({ hasText: /^Process$/ })).toBeVisible();
  await expect(page.locator("#about").getByText("About us", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /hello@pinna\.design/i })).toBeVisible();

  for (const project of projects.slice(0, 4)) {
    await expect(page.getByRole("link", { name: new RegExp(project.title.replace("/", "\\/"), "i") })).toBeVisible();
  }
});

test("header links move to page sections", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }).click();
  await expect(page.locator("#work")).toBeInViewport();

  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Services" }).click();
  await expect(page.locator("#services")).toBeInViewport();

  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page.locator("#about")).toBeInViewport();
});

test("project routes load directly and next project links work", async ({ page }) => {
  await page.goto(`/work/${projects[0].slug}`);
  await expect(page.getByRole("heading", { name: projects[0].title })).toBeVisible();

  await page.getByRole("link", { name: new RegExp(`Next project: ${projects[1].title}`, "i") }).click();
  await expect(page).toHaveURL(new RegExp(`/work/${projects[1].slug}$`));
  await expect(page.getByRole("heading", { name: projects[1].title })).toBeVisible();
});

test("browser back returns from a project to the homepage", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: new RegExp(projects[0].title, "i") }).click();
  await expect(page).toHaveURL(new RegExp(`/work/${projects[0].slug}$`));

  await page.goBack();
  await expect(page.getByRole("heading", { name: "PINNA.", exact: true })).toBeVisible();
});

test("mobile menu supports keyboard open, escape close and focus restoration", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work" })).toBeFocused();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});

test("copy email announces copied state", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => undefined
      }
    });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email" }).click();

  await expect(page.getByText("Copied")).toBeVisible();
});

test("has no horizontal overflow on required mobile widths", async ({ page }) => {
  for (const viewport of [
    { width: 430, height: 932 },
    { width: 390, height: 844 },
    { width: 360, height: 800 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  }
});

test("reduced motion keeps content visible", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "PINNA.", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: new RegExp(projects[0].title, "i") })).toBeVisible();
  await context.close();
});

test("test page contains the separated Giosi section", async ({ page }) => {
  await page.goto("/test");

  await expect(page.getByRole("heading", { name: "Giosi Pinna", exact: true })).toBeVisible();
  await expect(page.locator("[data-person-name-line]").filter({ hasText: "Pinna" })).toBeVisible();
});

test("image failure swaps to branded fallback without changing geometry", async ({ page }) => {
  await page.route(/.*(?:sora%2Fcover|sora\/cover).*/, async (route) => {
    await route.abort();
  });

  await page.goto("/work/sora");
  const media = page.locator("[data-media]").first();
  const before = await media.boundingBox();

  await expect(page.getByText("Media unavailable").first()).toBeVisible();
  const after = await media.boundingBox();

  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(before!.width - after!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(before!.height - after!.height)).toBeLessThanOrEqual(1);
});

test("media wrappers remain stable after images load", async ({ page }) => {
  await page.goto("/");
  const media = page.locator("[data-media]").first();
  await media.scrollIntoViewIfNeeded();
  const before = await media.boundingBox();
  await media.locator("img").evaluate((image) => {
    if (image instanceof HTMLImageElement && image.complete) {
      return;
    }

    return new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    });
  });
  const after = await media.boundingBox();

  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(before!.width - after!.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(before!.height - after!.height)).toBeLessThanOrEqual(1);
});

test("critical pages have no serious axe violations", async ({ page }) => {
  for (const path of ["/", `/work/${projects[0].slug}`]) {
    await page.goto(path);
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  }
});

test("captures required viewport screenshots", async ({ page }) => {
  const viewports = [
    { name: "home-1440x900", width: 1440, height: 900, path: "/" },
    { name: "work-1440x900", width: 1440, height: 900, path: "/", target: "#work" },
    { name: "home-390x844", width: 390, height: 844, path: "/" },
    { name: "project-1440x900", width: 1440, height: 900, path: "/work/sora" },
    { name: "project-390x844", width: 390, height: 844, path: "/work/sora" }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(viewport.path);
    if (viewport.target) {
      await page.locator(viewport.target).scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(300);
    await page.screenshot({ path: `test-artifacts/screenshots/${viewport.name}.png`, fullPage: false });
  }
});
