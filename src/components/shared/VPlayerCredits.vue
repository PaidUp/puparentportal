<template>
  <md-card md-with-hover>
    <md-ripple>
      <md-card-header>
        <div class="md-subheading">{{ credit.label }}</div>
        <div class="md-subhead">{{ credit.description }}</div>
      </md-card-header>
      <md-card-content class="card-content">
        <div class="status">
          <md-icon class="md-size-2x">check_circle</md-icon>
          <div class="md-caption">
            {{ credit.status }}
          </div>
        </div>
        <div class="amount-details">
          <div class="details">
            <span class="md-caption">{{ credit.memoId }}</span>
            <br>
            <span class="md-caption">{{ $d(credit.chargeOn, 'short') }}</span>
          </div>
          <v-currency :amount="credit.amount" clazz="total md-title" />
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button class="md-accent">Fix</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  export default {
    props: {
      credit: {
        type: Object,
        required: true
      }
    },
    components: {
      VCurrency
    },
    computed: {
    }
  }
</script>
