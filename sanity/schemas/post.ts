import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Haftalık Değerlendirme',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Ana Görsel (Sosyal Medya Paylaşımları İçin)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayınlanma Tarihi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet (SEO ve Sosyal Medya İçin)',
      description: 'Yazının Google ve sosyal medyada görünecek kısa özeti (yaklaşık 155 karakter).',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'İçerik',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})