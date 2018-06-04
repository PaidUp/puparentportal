<template lang="pug">
md-list.bottom-list
  md-list-item.logout-btn-nav
    md-icon power_settings_new
    div.md-list-item-text LOGOUT
  md-list-item
    md-icon send
    a.md-list-item-text(href="mailto:support@getpaidup.com")
      div Email Support
      div support@getpaidup.com
  md-list-item
    md-icon call
    a.md-list-item-text(href="tel:855-764-3232")
      div Call Support
      div (855) 764-3232
  md-list-item
    md-icon help
    a.md-list-item-text(href="https://getpaidup.zendesk.com/hc/en-us" target="_blank") Help Articles
    md-icon launch
</template>
