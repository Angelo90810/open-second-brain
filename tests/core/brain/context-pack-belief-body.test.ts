import { describe, expect, test } from "bun:test";

import { renderBeliefBody } from "../../../src/core/brain/context-pack.ts";

describe("renderBeliefBody", () => {
  test("a dream-written page (evidence trail only) injects its principle", () => {
    const body = [
      "",
      "## Origin",
      "",
      "- [[sig-2026-11-02-x]]",
      "",
      "## Recent applications",
      "",
      "- [[Sources/a]] — 2026-11-02T00:40:08Z (agent)",
      "",
    ].join("\n");
    expect(renderBeliefBody("Do the thing.", body)).toBe("Do the thing.");
  });

  test("narrative sections survive, the trail does not", () => {
    const body =
      "## How to apply\n\nAlways.\n\n## Origin\n\n- [[sig-a]]\n\n## Recent violations\n\n- [[x]]";
    expect(renderBeliefBody("Rule.", body)).toBe("## How to apply\n\nAlways.");
  });

  test("a page without an evidence trail is returned byte-identical", () => {
    expect(renderBeliefBody("Rule.", "")).toBe("");
    expect(renderBeliefBody("Rule.", "shared body")).toBe("shared body");
    expect(renderBeliefBody("Rule.", "## Retired\n\nReason: x\n")).toBe(
      "## Retired\n\nReason: x\n",
    );
  });
});
