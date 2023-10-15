import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: () => "🗓",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      name: "dateTimeStart",
      title: "Start",
      type: "datetime",
      options: {
        timeStep: 15,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
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
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
  ],
  orderings: [
    {
      title: "Date, Newest",
      name: "releaseDateDesc",
      by: [{ field: "dateTimeStart", direction: "desc" }],
    },
    {
      title: "Date, Oldest",
      name: "releaseDateAsc",
      by: [{ field: "dateTimeStart", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      category: "categories[0].title",
      dateTimeStart: "dateTimeStart",
      media: "image",
    },
    prepare(selection) {
      const { dateTimeStart, category } = selection;
      const date = new Date(dateTimeStart);
      const options: Intl.DateTimeFormatOptions = {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-US", options);

      return { ...selection, subtitle: `${formattedDate}` };
    },
  },
});
