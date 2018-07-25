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
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>replay</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(true)">
        <md-icon>file_copy</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(false)">
        <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue">
        <md-icon>delete</md-icon>
      </md-button>
    </md-card-actions>
    <chap-invoice-dialog :invoice="item" :isClone="isClone" :show="showEditDialog" @updated="$emit('updated', true)" @changeStatus="changeInvoceDialogStatus"></chap-invoice-dialog>
  </md-card>
  
   

</template>

<script>
  import ChapInvoiceDialog from './ChapInvoiceDialog.vue'
  import VCurrency from '@/components/shared/VCurrency.vue'
  import { mapState } from 'vuex'
  
  export default {
    props: {
      item: Object
    },
    components: {
      VCurrency, ChapInvoiceDialog
    },
    data () {
      return {
        showEditDialog: false,
        isClone: false
      }
    },
    computed: {
      ...mapState('commonModule', {
        invoiceMapper: 'invoiceMapper'
      }),
      nameButton () {
        if (this.item.status === 'autopay') return 'Edit'
        else if (this.item.status === 'failed') return 'Fix'
        else return 'View'
      },
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
      select () {
        this.$emit('select', this.item)
      },
      openDialog (isClone) {
        this.isClone = isClone
        this.showEditDialog = true
      },
      getInvoiceStatusMapper () {
        return this.invoiceMapper[this.item.status] || { desc: '', key: '', class: [] }
      },
      changeInvoceDialogStatus (value) {
        this.showEditDialog = value
      }
    }
  }
</script>
