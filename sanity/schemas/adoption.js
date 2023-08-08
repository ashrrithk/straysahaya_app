import {defineField, defineType} from 'sanity'
import help from './helpline'

export default defineType({
  name: 'adoption',
  title: 'Adoption',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'help',
      title: 'Help',
      type: 'array',
      of: [{type: 'reference', to: {type: 'help'}}],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'animalType',
      title: 'Animal Type',
      type: 'string',
      options: {
        list: [
            {title: 'Dog', value: 'Dog'},
            {title: 'Cat', value: 'Cat'},
            {title: 'Pig', value: 'Pig'},
            {title: 'Rabbit', value: 'Rabbit'},
            {title: 'Bird', value: 'Bird'},
            {title: 'Horse', value: 'Horse'},
            {title: 'Cow', value: 'Cow'},
            {title: 'Goat', value: 'Goat'},
            {title: 'Sheep', value: 'Sheep'},
            {title: 'Donkey', value: 'Donkey'},
            {title: 'Ox', value: 'Ox'},
            {title: 'Bull', value: 'Bull'},
            {title: 'Duck', value: 'Duck'},
            {title: 'Others', value: 'Others'},


        ],
    },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
        name: 'bannerImg',
        title: 'Banner Images',
        type: 'array',
        of: [{type: 'image'}],
        options: {
          hotspot: true,
        },
      }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'object',
        fields: [
            defineField({
                name: 'age',
                title: 'Age',
                type: 'string',
                validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'breed',
              title: 'Breed',
              type: 'string',
              validation: Rule => Rule.required(),
          }),
            defineField({
                name: 'gender',
                title:'Gender',
                type: 'string',
                options: {
                    list: [
                        {title: 'Male', value: 'Male'},
                        {title: 'Female', value: 'Female'},
                    ],
                },
                validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'vaccination',
                    title: 'Vaccination',
                    type: 'string',
                    options: {
                        list: [
                            {title: 'Vaccinated', value: 'Vaccinated'},
                            {title: 'Not Vaccinated', value: 'Not Vaccinated'},
                        ],
                    },
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'color',
                    title: 'Color',
                    type: 'string',
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'neutered',
                    title: 'Neutered',
                    type: 'string',
                    options: {
                        list: [
                            {title: 'Neutered', value: 'Neutered'},
                            {title: 'Not Neutered', value: 'Not Neutered'},
                            {title: 'Sprayed', value: 'Sprayed'},
                            {title: 'Not Sprayed', value: 'Not Sprayed'},
                        ],
                    },
                    validation: Rule => Rule.required(),
                }),
                defineField({
                    name: 'description',
                    title: 'Description',
                    type: 'blockContent',
                }),
            ],
    }),
   
        
  ],

//   preview: {
//     select: {
//       title: 'name',
//       help: 'help',
//       media: 'mainImage',
//     },
//     prepare(selection) {
//       const {help} = selection
//       return {...selection, subtitle: help.name && `by ${help}`}
//     },
//   },
preview: {
    select: {
      title: 'name',
      help: 'help',
      media: 'mainImage',
    },
  },
})
