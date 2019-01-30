<template lang="pug">
  <md-card v-if="statusMapper" md-with-hover class="card-invoice2">
    <md-card-header>
      <div class="title cgray">{{ item.title }}</div>
      <div class="caption">{{ statusMapper.subtext }}</div>
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
          <span class="md-caption">{{ $moment.formatDate(item.date) }}</span>
        </div>
        <v-currency :amount="item.price" clazz="total md-title"></v-currency>
      </div>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(true)">
        <md-icon>file_copy</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="openDialog(false)">
        <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-dense md-accent lblue" @click="confirm = true">
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
    components: { VCurrency },
    data () {
      return {
        confirm: false,
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
      ...mapActions('playerInvoicesModule', {
        deleteCredit: 'deleteCredit'
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
      async refreshMapper () {
        const resp = await this.getInvoiceDesc(this.item.status)
        this.statusMapper = {
          icon: resp.key,
          clazz: resp.class,
          status: resp.desc,
          subtext: resp.subtext
        }
      },
      remove () {
        this.deleteCredit(this.item.id).then(result => {
          this.setSuccess('Credit was cloned succeeded')
          this.$emit('deleted', true)
        }).catch(reason => {
          this.setSuccess(`Credit don't was cloned`)
        })
      },
      ...mapActions('commonModule', {
        getInvoiceDesc: 'getInvoiceDesc'
      })
    }
  }
</script>
