export default {
  name:  "githubProject",
  title: "GitHub Project",
  type:  "document",

  fields: [
    {
      name:        "title",
      title:       "Project Title",
      type:        "string",
      validation:  (R) => R.required(),
    },
    {
      name:        "description",
      title:       "Description",
      type:        "text",
      rows:        3,
      validation:  (R) => R.required().max(200),
    },
    {
      name:  "githubUrl",
      title: "GitHub URL",
      type:  "url",
    },
    {
      name:  "liveUrl",
      title: "Live URL (optional)",
      type:  "url",
    },
    {
      name:  "thumbnail",
      title: "Thumbnail Image",
      type:  "image",
      options: {
        hotspot: true,
      },
    },
    {
      name:  "tags",
      title: "Tags",
      type:  "array",
      of:    [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name:    "order",
      title:   "Display Order",
      type:    "number",
      description: "Lower number shows first",
    },
  ],

  preview: {
    select: {
      title:  "title",
      media:  "thumbnail",
    },
  },
};