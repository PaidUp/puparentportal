<template lang="pug">
  .top-toolbar
    router-link(to="/")
      img.logo(src="@/assets/app-logo-white.svg")
    md-menu.user-menu(md-size="auto" md-align-trigger md-direction="bottom-end")
      md-button(class="md-raised md-primary" md-menu-trigger) 
        md-avatar 
          img(src="@/assets/avatar.jpg")
        | &nbsp; Diego Fortes
        md-icon keyboard_arrow_down
      md-menu-content
        md-menu-item My Item 1
        md-menu-item My Item 1
        md-menu-item My Item 1

</template>

<script>
export default {
  data: function () {
    return {
      msg: 'THEE MSAGE BIATH'
    }
  }
}
</script>

