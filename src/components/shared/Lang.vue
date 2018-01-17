<template lang="pug">
  .columns
    .column
      a(@click="change()") 🇺🇸
      a(@click="change('es')") 🇪🇸
</template>
<script>
export default {
  methods: {
    change (lang = 'en') {
      this.$i18n.locale = lang
    }
  }
}
</script>

