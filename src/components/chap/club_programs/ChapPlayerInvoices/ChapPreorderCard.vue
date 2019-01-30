<template>
  <md-card v-if="statusMapper" md-with-hover class="card-invoice2">
    <md-card-header>
      <div class="title cgray">{{ item.title }}</div>
      <div class="caption">{{ statusMapper.subtext }}</div>
    </md-card-header>
    <md-card-content>
      <div class="status">
        <md-icon class="md-size-c cred" :class="statusMapper.clazz">{{ statusMapper.icon }}</md-icon>
        <div class="md-caption" v-html="statusMapper.status"></div>
      </div>
      <div class="amount-details">
        <div class="details">
          <span class="md-caption">{{ $moment.formatDate(item.date) }}</span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </md-card-content>
    <md-card-actions>
      <!-- Important do not delete this tag -->
      &nbsp;
    </md-card-actions>
  </md-card>

</template>

<script>
  import VCurrency from '@/components/shared/VCurrency.vue'
  import { mapActions } from 'vuex'
  
  export default {
    props: {
      item: Object
    },
    components: {
      VCurrency
    },
    data () {
      return {
        statusMapper: null
      }
    },
    async mounted () {
      this.refreshMapper()
    },
    watch: {
      item () {
        this.refreshMapper()
      }
    },
    methods: {
      ...mapActions('commonModule', {
        getInvoiceDesc: 'getInvoiceDesc'
      }),
      async refreshMapper () {
        const resp = await this.getInvoiceDesc(this.item.status)
        this.statusMapper = {
          icon: resp.key,
          clazz: resp.class,
          status: resp.desc,
          subtext: resp.subtext
        }
      }
    }
  }
</script>
