<template lang="pug">
  .players-view
    .player
      md-avatar
        img(src="@/assets/avatar.jpg")
      .name(class="md-title md-primary") Enzo Fernandez
      .team Isotopes Baseball Club
      .location Austin, TX
    .details
      .md-subheading Details
      md-content(class="md-elevation-4 md-layout md-alignment-center-space-between")
        .md-layout-item(class="md-size-33")
          .md-layout(class="md-alignment-center-space-between md-gutter")
            .md-layout-item
              md-field
                label(for="season") Season
                md-select(v-model="season" name="season" id="season")
                  md-option(value="2017/2018") 2017/2018
                  md-option(value="2016/2017") 2016/2017
                  md-option(value="2015/2016") 2015/2016
            .md-layout-item
              md-field.md-layout-item
                label(for="program") Program
                md-select(v-model="program" name="program" id="program")
                  md-option(value="12U Red") 12U Red Premier
                  md-option(value="12U Red2") 12U Red2 Premier
                  md-option(value="12U Red3") 12U Red3 Premier
        .md-layout-item(class="md-size-40 md-layout md-alignment-center-space-between md-gutter")
          .md-layout-item
            .md-caption Total
            div $3042
          .md-layout-item
            .md-caption Paid
            div $3042
          .md-layout-item
            .md-caption Unpaid
            div $3042
          .md-layout-item
            .md-caption Overdue
            div $3042
          .md-layout-item
            .md-caption Credited
            div $3042

    //- .invoices
    //-   .md-subheading Invoices
    //-   md-content(class="md-elevation-4 md-layout")
    //-     .md-layout-item 1
    //-     .md-layout-item 2
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('userModule', {
      user: 'user'
    })
  }
}
</script>

