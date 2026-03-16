export default {
  name:  "aiWebsite",
  title: "AI Website",
  type:  "document",

  fields: [
    {
      name:        "title",
      title:       "Website Title",
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
      name:        "liveUrl",
      title:       "Live URL",
      type:        "url",
      validation:  (R) => R.required(),
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
      name:  "toolsUsed",
      title: "AI Tools Used",
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
      title: "title",
      media: "thumbnail",
    },
  },
};