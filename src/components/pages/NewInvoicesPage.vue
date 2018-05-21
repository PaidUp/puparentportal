<template>
  <div class="common-page new-invoices-page">
    <div class="title">Make/Schedule Payment</div>
    <div class="title-info">A new invoice is available for your review and approval, or make/schedule a payment for a standard payment plan.</div>
    <div class="common-player-info">
      <md-avatar class="md-large">
        <img src="@/assets/avatar.jpg" alt="avatar">
      </md-avatar>
      <div class="name">
        Felipe Fernandez
      </div>
      <div class="team">
        Isotopes Club
      </div>
    </div>
    <div class="cards">
      <md-card class="common-card">
        <div class="title">
          Player Travel - JVA World Championship
        </div>
        <div class="content">
          <div class="centered">
            <md-icon class="md-size-c">note_add</md-icon>
            <div class="caption">NEW INVOICE</div>
          </div>
          <div class="total">
            <sup>$</sup>1,500.<sup>00</sup>
          </div>
        </div>
        <div class="actions">
          <md-button class="lblue md-accent">
            VIEW &amp; PAY
          </md-button>
        </div>
      </md-card>
      <md-card class="common-card">
        <div class="title">
          Player Travel - JVA World Championship
        </div>
        <div class="content">
          <div class="centered">
            <md-icon class="md-size-c">note_add</md-icon>
            <div class="caption">NEW INVOICE</div>
          </div>
          <div class="total">
            <sup>$</sup>1,500.<sup>00</sup>
          </div>
        </div>
        <div class="actions">
          <md-button class="lblue md-accent">
            VIEW &amp; PAY
          </md-button>
        </div>
      </md-card>
      <md-card class="common-card">
        <div class="title">
          Player Travel - JVA World Championship
        </div>
        <div class="content">
          <div class="centered">
            <md-icon class="md-size-c">note_add</md-icon>
            <div class="caption">NEW INVOICE</div>
          </div>
          <div class="total">
            <sup>$</sup>1,500.<sup>00</sup>
          </div>
        </div>
        <div class="actions">
          <md-button class="lblue md-accent">
            VIEW &amp; PAY
          </md-button>
        </div>
      </md-card>
    </div>
    <div>
      <md-button class="lblue md-accent">CANCEL</md-button>
      <md-button class="lblue md-accent md-raised">VIEW STANDARD PLANS</md-button>
    </div>
  </div>

</template>

<script>
  export default {
    data: function () {
      return {
        name: 'Diego'
      }
    },
    methods: {}
  }
</script>
