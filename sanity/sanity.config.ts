import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import post from './schemas/post'
import blockContent from './schemas/blockContent'
import resmiPuanDurumu from './schemas/resmiPuanDurumu'
import puanDurumuSatiri from './schemas/puanDurumuSatiri'
import fiksturHaftasi from './schemas/fiksturHaftasi'
import mac from './schemas/mac'
import takim from './schemas/takim'
import siteAyarlari from './schemas/siteAyarlari'


const schemaTypes = [
  post,
  resmiPuanDurumu,
  fiksturHaftasi,
  puanDurumuSatiri,
  takim,
  mac,
  blockContent,
  siteAyarlari,
]

export default defineConfig({
  name: 'default',
  title: 'Adil Futbol Studio',
  projectId: 'qyxpdxvm',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})