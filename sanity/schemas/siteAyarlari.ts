import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteAyarlari',
  title: 'Site Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'anaSayfaManseti',
      title: 'Ana Sayfa Manşeti',
      description: 'Eğer burası boş bırakılırsa, en son analizin başlığı otomatik olarak gösterilir.',
      type: 'string',
    }),
    defineField({
        name: 'anaSayfaAltBasligi',
        title: 'Ana Sayfa Alt Başlığı',
        type: 'string',
    }),
  ],
})