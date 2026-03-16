import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import githubProject from "./schemas/githubProject";
import aiWebsite from "./schemas/aiWebsite";

export default defineConfig({
  name:      "portfolio",
  title:     "Portfolio CMS",
  projectId: "zzi4rw4f",
  dataset:   "production",
  plugins:   [structureTool()],
  schema: {
    types: [
      githubProject,
      aiWebsite,
    ],
  },
});