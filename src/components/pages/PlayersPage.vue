<template>
  <div class="players-page">
    <div class="player">
      <VPlayerInfo :player="beneficiary"/>
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
        <VPlayerDetails v-if="order" :invoices="order.invoices" />
      </md-content>
    </div>
    <div class="invoices" v-if="order">
      <div class="md-subheading title">Invoices</div>
      <div class="inv-cards" >
        <VPlayerInvoices :invoice="invoice" v-for="invoice in order.invoices" :key="invoice._id" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import VPlayerInfo from '@/components/shared/VPlayerInfo.vue'
  import VPlayerDetails from '@/components/shared/VPlayerDetails.vue'
  import VPlayerInvoices from '@/components/shared/VPlayerInvoices.vue'
  export default {
    components: {
      VPlayerInfo,
      VPlayerInvoices,
      VPlayerDetails
    },
    data: function () {
      return {
        userP: {
          name: 'Enzo Perez',
          avatar: 'avatar.jpg',
          team: 'Isotopes of Springfield'
        }
      }
    },
    computed: {
      ...mapState('userModule', {
        user: 'user'
      }),
      ...mapState('playerModule', {
        beneficiary: 'beneficiary',
        orders: 'orders'
      }),
      order () {
        if (this.orders.length) {
          let order = this.orders[this.orders.length - 1]
          order.invoices.sort((a, b) => {
            a.dataCharge = new Date(a.dataCharge)
            b.dataCharge = new Date(b.dataCharge)
            return a.dataCharge.getTime() - b.dataCharge.getTime()
          })
          return order
        }
        return []
      }
    },
    mounted () {
      if (this.user.email) this.getOrders(this.user.email)
    },
    watch: {
      user () {
        this.getOrders(this.user.email)
      }
    },
    methods: {
      ...mapActions('playerModule', {
        getOrders: 'getOrders'
      })
    }
  }
</script>
