import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'resmiPuanDurumu',
  title: 'Resmi Puan Durumu',
  type: 'document',
  fields: [
    defineField({name: 'sezon', title: 'Sezon', type: 'string'}),
    defineField({name: 'hafta', title: 'Hafta', type: 'number'}),
    defineField({name: 'tabloSatirlari', title: 'Puan Tablosu', type: 'array', of: [{type: 'puanDurumuSatiri'}]}),
  ],
})