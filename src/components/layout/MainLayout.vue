<template lang="pug">
  md-app
    md-app-toolbar.md-primary
      span.md-title My Title

    md-app-drawer.left-nav(md-permanent='clipped')
      md-list.top-list
        md-list-item
          md-icon home
          span.md-list-item-text Dashboard
        md-list-item
          md-icon account_circle
          span.md-list-item-text Player
        md-list-item
          md-icon shopping_cart
          span.md-list-item-text Make/Schedule Payment
        md-list-item
          md-icon credit_card
          span.md-list-item-text Payments Accounts
      md-list.bottom-list
        md-list-item
          md-icon settings
          span.md-list-item-text Settings
        md-list-item
          md-icon send
          span.md-list-item-text Email Support
        md-list-item
          md-icon call
          span.md-list-item-text Call Support
        md-list-item
          md-icon help
          span.md-list-item-text Help

    md-app-content
      router-view
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

