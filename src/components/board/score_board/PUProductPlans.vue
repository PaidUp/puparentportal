<template>
<div class="cards-layout">
  <md-card md-with-hover class="card-payment-plan" v-for="plan in plans" :key="plan.id">
    <div class="title">
      {{plan.description}}
    </div>
    <div class="body">
      <div class="number-big cgreen">${{format(plan.amount)}}</div>
      <div class="title-info">{{plan.installments}} Installments</div>
      <div class="title-info">Nov 15, 2018 - Mar 1, 2019 ??</div>
    </div>
    <div class="actions">
      <md-button class="md-icon-button">
        <md-icon>visibility_off</md-icon>
      </md-button>
      <md-menu md-size="small" md-direction="top-start">
        <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
          <md-icon>more_vert</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="cannotDeleteAlert = true">
            DELETE
          </md-menu-item>
          <md-menu-item @click="confirmDeleteAlert = true">
            DUPLICATE
          </md-menu-item>
          <md-menu-item @click="btnData = 'click 1'">
            EDIT
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </div>
  </md-card>
</div>
</template>
<script>
import currency from '@/helpers/currency'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      plans: null
    }
  },
  computed: {
    ...mapState('scoreboardModule', {
      programSelected: 'programSelected'
    })
  },
  watch: {
    programSelected () {
      this.getPlans(this.programSelected).then(plans => {
        this.plans = plans
      })
    }
  },
  mounted () {
    this.getPlans(this.programSelected).then(plans => {
      this.plans = plans
    })
  },
  methods: {
    ...mapActions('scoreboardModule', {
      getPlans: 'getPlans'
    }),
    format (value) {
      return currency(value)
    }
  }
}
</script>

