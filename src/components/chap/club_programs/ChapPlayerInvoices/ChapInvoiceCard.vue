<template>
  <md-card v-if="statusMapper" md-with-hover class="card-invoice2">
    <md-card-header>
      <div class="title cgray">{{ item.title }}</div>
      <div class="caption">{{ paymetMethod }}</div>
    </md-card-header>
    <md-card-content>
      <div class="status">
        <md-icon class="md-size-c" :class="statusMapper.clazz">{{ statusMapper.icon }}</md-icon>
        <div class="md-caption" v-html="statusMapper.status"></div>
      </div>
      <div class="amount-details">
        <div class="details">
          <span class="md-caption">{{ item.seq }}</span>
          <br/>
          <span v-if="item.chargeDate" class="md-caption">{{ $moment.formatDate(item.chargeDate) }}</span>
          <span v-else class="md-caption">{{ $moment.formatDate(item.date) }}</span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </md-card-content>
    <md-card-actions>
      <md-button v-if="item.status === 'paidup'" @click="openRefundDialog" class="md-icon-button md-dense md-accent lblue">
        <md-icon>replay</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(true)">
        <md-icon>file_copy</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(false)">
        <md-icon>edit</md-icon>
      </md-button>
      <md-button v-if="item.status === 'failed' || item.status === 'autopay'" @click="confirm = true" class="md-icon-button md-dense md-accent lblue">
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
    <md-dialog-confirm :md-active.sync="confirm" md-title="Delete Credit" md-content="Are you sure." md-confirm-text="Yes" md-cancel-text="No" @md-cancel="confirm = false" @md-confirm="remove" />
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
    mounted () {
      this.refreshMapper()
    },
    data () {
      return {
        confirm: false,
        showEditDialog: false,
        isClone: false.subtext,
        statusMapper: null
      }
    },
    watch: {
      item () {
        this.refreshMapper()
      }
    },
    computed: {
      paymetMethod () {
        if (this.item.paymentDetails) return this.item.paymentDetails.brand + '••••' + this.item.paymentDetails.last4
        return ''
      }
    },
    methods: {
      ...mapActions('playerInvoicesModule', {
        deleteInvoice: 'deleteInvoice'
      }),
      ...mapActions('messageModule', {
        setSuccess: 'setSuccess',
        setWarning: 'setWarning'
      }),
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
      },
      openDialog (isClone) {
        this.$emit('select', {
          item: this.item,
          isClone
        })
      },
      openRefundDialog () {
        this.$emit('selectRefund', this.item)
      },
      remove () {
        this.deleteInvoice(this.item.id).then(result => {
          this.setSuccess('Invoce was removed succeeded')
          this.$emit('deleted', true)
        }).catch(reason => {
          this.setSuccess(`Invoice don't was removed`)
        })
      },
      changeInvoceDialogStatus (value) {
        this.showEditDialog = value
      }
    }
  }
</script>
