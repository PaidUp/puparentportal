<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-subheading">Dues - Commitment Fee paid to coach </div>
        <div class="md-subhead">Paid to club</div>
      </md-card-header>
      <md-card-content class="card-content">
        <div class="status">
          <md-icon class="md-size-2x">check_circle</md-icon>
          <div class="md-caption">
            PAID
          </div>
        </div>
        <div class="amount-details">
          <div class="details">
            <span class="md-caption">INV9203848848</span>
            <br>
            <span class="md-caption">09/15/2017</span>
          </div>
          <div class="total md-title">
            $350.
            <sup>00</sup>
          </div>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent">Fix</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
  export default {
    props: {
      cards: Array
    },
    computed: {
      avatarUrl: function () {
        return '/assets/' + this.cards
      }
    }
  }
</script>
