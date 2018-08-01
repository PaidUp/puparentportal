<template>
  <md-card md-with-hover class="card-invoice2">
    <md-card-header>
      <div class="title cgray">{{ item.title }}</div>
      <div class="caption">{{ paymetMethod }}</div>
    </md-card-header>
    <md-card-content>
      <div class="status">
        <md-icon class="md-size-c" :class="clazz">{{ icon }}</md-icon>
        <div class="md-caption" v-html="status"></div>
      </div>
      <div class="amount-details">
        <div class="details">
          <span class="md-caption">{{ item.seq }}</span>
          <br/>
          <span class="md-caption">{{ $d(item.date, 'short') }}</span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </md-card-content>
    <md-card-actions>
      <md-button v-if="item.status === 'paidup'" class="md-icon-button md-dense md-accent lblue">
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
  import { mapState, mapActions } from 'vuex'
  
  export default {
    props: {
      item: Object
    },
    components: {
      VCurrency
    },
    data () {
      return {
        confirm: false,
        showEditDialog: false,
        isClone: false
      }
    },
    computed: {
      ...mapState('commonModule', {
        invoiceMapper: 'invoiceMapper'
      }),
      paymetMethod () {
        if (this.item.paymentDetails) return this.item.paymentDetails.brand + '••••' + this.item.paymentDetails.last4
        return ''
      },
      icon () {
        return this.getInvoiceStatusMapper().key
      },
      clazz () {
        return this.getInvoiceStatusMapper().class
      },
      status () {
        return this.getInvoiceStatusMapper().desc
      },
      subtext () {
        return this.getInvoiceStatusMapper().subtext
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
      openDialog (isClone) {
        this.$emit('select', {
          item: this.item,
          isClone
        })
      },
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
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
