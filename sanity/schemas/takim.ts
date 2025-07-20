import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'takim',
  title: 'Takım',
  type: 'document',
  fields: [
    defineField({
      name: 'isim',
      title: 'Takım İsmi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Gelecekte logolarını eklemek istersek diye bu alanı şimdiden oluşturuyoruz.
    defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image',
        options: {
          hotspot: true,
        },
    }),
  ],
})