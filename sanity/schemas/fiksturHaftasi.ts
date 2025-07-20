import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'fiksturHaftasi',
  title: 'Haftalık Fikstür',
  type: 'document',
  fields: [
    defineField({
        name: 'sezon',
        title: 'Sezon',
        type: 'string',
        initialValue: '2025-2026',
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hafta',
      title: 'Hafta',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(38),
    }),
    defineField({
      name: 'maclar',
      title: 'Maçlar',
      type: 'array',
      of: [{type: 'mac'}], // Yukarıda oluşturduğumuz 'mac' şemasını kullanır
    }),
  ],
  preview: {
    select: {
      week: 'hafta',
      season: 'sezon'
    },
    prepare({week, season}) {
      return {
        title: `${week}. Hafta`,
        subtitle: `${season} Sezonu`
      }
    }
  }
})