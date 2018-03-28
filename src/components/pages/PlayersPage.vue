<template>
  <div class="players-page">
    <div class="player">
      <VPlayerInfo :user="userP"/>
    </div>
    <div class="details">
      <div class="md-subheading title">Details</div>
      <md-content class="md-elevation-4 details-box">
        <div class="details-selects">
          <md-field class="season-select">
            <label for="season">Season</label>
            <md-select name="season" id="season">
              <md-option value="2017/2018">2017/2018</md-option>
              <md-option value="2016/2017">2016/2017</md-option>
              <md-option value="2015/2016">2015/2016</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label for="program">Program</label>
            <md-select name="program" id="program">
              <md-option value="12U Red">12U Red Premier</md-option>
              <md-option value="12U Red2">12U Red2 Premier</md-option>
              <md-option value="12U Red3">12U Red3 Premier</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="details-numbers">
          <div>
            <div class="md-body-2 concept">Total</div>
            <div class="md-title">$3,250.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Paid</div>
            <div class="md-title green">$1,250.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Unpaid</div>
            <div class="md-title gray">$1,400.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Overdue</div>
            <div class="md-title red">$350.<sup>00</sup></div>
          </div>
          <div>
            <div class="md-body-2 concept">Credited</div>
            <div class="md-title blue">$250.<sup>00</sup></div>
          </div>
        </div>
      </md-content>
    </div>
    <div class="invoices">
      <div class="md-subheading title">Invoices</div>
      <div class="inv-cards">
        <VPlayerInvoices :cards="cards" v-for="card in cards" :key="card" />
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices
    },
    data: function () {
      return {
        userP: {
          name: 'Enzo Perez',
          avatar: 'avatar.jpg',
          team: 'Isotopes of Springfield'
        },
        cards: [1, 2, 3, 4, 5]
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      })
    }
  }
</script>
