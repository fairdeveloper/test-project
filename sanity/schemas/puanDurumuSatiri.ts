import {defineField, defineType} from 'sanity'
export default defineType({
    name: 'puanDurumuSatiri',
    title: 'Puan Durumu Satırı',
    type: 'object',
    fields: [
        defineField({ name: 'pozisyon', title: 'Pozisyon', type: 'number'}),
        defineField({ name: 'takim', title: 'Takım', type: 'string'}),
        defineField({ name: 'oynananMac', title: 'O', type: 'number' }),
        defineField({ name: 'galibiyet', title: 'G', type: 'number' }),
        defineField({ name: 'beraberlik', title: 'B', type: 'number' }),
        defineField({ name: 'maglubiyet', title: 'M', type: 'number' }),
        defineField({ name: 'puan', title: 'Puan', type: 'number'}),
        defineField({ name: 'averaj', title: 'Avj', type: 'number' }),
        defineField({ name: 'aciklama', title: 'Açıklama (Adil Puan Durumu için)', type: 'string' }),
    ]
})