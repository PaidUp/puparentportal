<template>
<div class="cards-layout">
  <md-card md-with-hover class="card-payment-plan" v-for="plan in plans" :key="plan.id">
    <div class="title">
      {{plan.description}}
    </div>
    <div class="body">
      <div class="number-big cgreen">${{format(plan.amount)}}</div>
      <div class="title-info">{{plan.installments}} Installments</div>
      <div class="title-info">{{$moment(plan.startCharge).format('DD MMM, YYYY')}} {{plan.installments > 1 ? ' - ' + $moment(plan.endCharge).format('DD MMM, YYYY') : ''}}</div>
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
  <div class="md-card-add-circle">
    <md-button @click="add" class="md-fab lblue">
      <md-icon>add</md-icon>
    </md-button>
  </div>
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
    ...mapState('clubprogramsModule', {
      programSelected: 'programSelected'
    })
  },
  watch: {
    programSelected () {
      this.getReducePlans(this.programSelected).then(plans => {
        this.plans = plans
      })
    }
  },
  mounted () {
    this.getReducePlans(this.programSelected).then(plans => {
      this.plans = plans
    })
  },
  methods: {
    ...mapActions('clubprogramsModule', {
      getReducePlans: 'getReducePlans'
    }),
    format (value) {
      return currency(value)
    },
    add () {
      this.$emit('add', true)
    }
  }
}
</script>

