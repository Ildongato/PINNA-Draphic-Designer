import { describe, expect, it } from "vitest";
import { getNextProject, getProject, projects } from "../../src/data/projects";

describe("project data", () => {
  it("contains the supplied project set with stable slugs", () => {
    expect(projects).toHaveLength(10);
    expect(projects.map((project) => project.slug)).toContain("sora");
    expect(getProject("field-notes")?.title).toBe("FIELD NOTES");
  });

  it("cycles the next project from the final item back to the first", () => {
    const finalProject = projects.at(-1);

    expect(finalProject).toBeDefined();
    expect(getNextProject(finalProject!.slug)).toBe(projects[0]);
  });
});
