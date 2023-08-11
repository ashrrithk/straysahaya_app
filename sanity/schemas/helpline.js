import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'help',
  title: 'Help',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
          list: [
              {title: 'Rescue', value: 'Rescue'},
              {title: 'Vet', value: 'Vet'},
              {title: 'Ambulance', value: 'Ambulance'},
              {title: 'Animal Shelter', value: 'Animal Shelter'},
              {title: 'Animal Birth Control', value: 'Animal Birth Control'},
          ],
      },
      validation: Rule => Rule.required(),
  }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'number',

      validation: Rule => Rule.required().max(9999999999),
    }),
    defineField({
      name: 'area',
      title: 'Area',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'timing',
      title: 'Timing',
      type: 'string',
    }),
    defineField({
      name: 'google_map',
      title: 'Google Map',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'donate',
      title: 'Donation Link',
      type: 'string',
    }),


  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
