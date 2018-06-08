<template>
  <div class="club-programs-page">

    <!-- BREADCRUMBS -->
    <div class="breadcrums-box">
      <md-icon>arrow_back</md-icon>
      <div>2017/2018</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>12U Red</div>
      <md-icon>keyboard_arrow_right</md-icon>
      <div>Mylo Fernandez</div>
    </div>

    <div class="common-player-info">
      VPlayerInfo Component goes here
    </div>

    <!-- DETAILS -->
    <div class="details">
      <div class="pre-cards-title">Details</div>
      <div class="details-box">
        <div class="details-selects">
          <md-field>
            <label>Season</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Program</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label>Parent</label>
            <md-select v-model="movie">
              <md-option value="godfather">Example Sel</md-option>
            </md-select>
          </md-field>
        </div>
        <div class="details-numbers">
          <div>
            <div class="concept">Total</div>
            <div class="title-big">$1233</div>
          </div>
          <div>
            <div class="concept">Paid</div>
            <div class="title-big green">$1233</div>
          </div>
          <div>
            <div class="concept">Unpaid</div>
            <div class="title-big gray">$1233</div>
          </div>
          <div>
            <div class="concept">Overdue</div>
            <div class="title-big red">$1233</div>
          </div>
          <div>
            <div class="concept">Credited</div>
            <div class="title-big blue">$1233</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- TABS -->
    <div class="tabs-section">
      <md-tabs class="tabs-lblue">
        <md-tab id="tab-invoices" md-label="Invoices">
          asd
        </md-tab>
        <md-tab id="tab-assigned-plans" md-label="Assigned Plans">
          Assigned Plans
        </md-tab>
        <md-tab id="tab-parents" md-label="Parents">
          Parents
        </md-tab>
      </md-tabs>

    </div>
  </div>

</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data: function () {
      return {
        movie: 'godfather'
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {}
  }
</script>
