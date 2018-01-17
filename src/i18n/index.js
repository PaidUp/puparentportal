import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/i18n/messages'
import * as formats from '@/i18n/formats'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
  numberFormats: formats.numberFormats,
  dateTimeFormats: formats.dateTimeFormats
})

export default i18n
