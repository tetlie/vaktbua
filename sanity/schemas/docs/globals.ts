import { defineField, defineType } from "sanity";

export default defineType({
  name: "globals",
  title: "Globals",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      title: "Ticket URL",
      name: "ticketUrl",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "soMeLinks",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          title: "Link",
          fields: [
            {
              title: "Title",
              name: "title",
              type: "string",
            },
            {
              title: "URL",
              name: "url",
              type: "url",
              validation: (Rule) =>
                Rule.uri({
                  scheme: ["http", "https", "mailto", "tel"],
                }),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "object",
      fields: [
        {
          title: "Monday",
          name: "monday",
          type: "string",
        },
        {
          title: "Tuesday",
          name: "tuesday",
          type: "string",
        },
        {
          title: "Wednesday",
          name: "wednesday",
          type: "string",
        },
        {
          title: "Thursday",
          name: "thursday",
          type: "string",
        },
        {
          title: "Friday",
          name: "friday",
          type: "string",
        },
        {
          title: "Saturday",
          name: "saturday",
          type: "string",
        },
        {
          title: "Sunday",
          name: "sunday",
          type: "string",
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
