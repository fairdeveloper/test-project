import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'mac',
  title: 'Maç',
  type: 'object',
  fields: [
    defineField({
      name: 'tarih',
      title: 'Maç Tarihi ve Saati',
      type: 'datetime',
    }),
    // 'string' yerine artık 'reference' kullanıyoruz
    defineField({
      name: 'evSahibi',
      title: 'Ev Sahibi Takım',
      type: 'reference',
      to: [{type: 'takim'}], // 'takim' şemasına referans veriyoruz
    }),
    defineField({
      name: 'deplasman',
      title: 'Deplasman Takımı',
      type: 'reference',
      to: [{type: 'takim'}], // 'takim' şemasına referans veriyoruz
    }),
    defineField({
      name: 'skor',
      title: 'Skor',
      type: 'string',
    }),
    defineField({
      name: 'oynandiMi',
      title: 'Maç Oynandı mı?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      home: 'evSahibi.isim', // Referansın içindeki 'isim' alanını alıyoruz
      away: 'deplasman.isim',
      score: 'skor'
    },
    prepare({home, away, score}) {
      return {
        title: `${home || 'N/A'} vs ${away || 'N/A'}`,
        subtitle: score || 'Henüz Oynanmadı'
      }
    }
  }
})