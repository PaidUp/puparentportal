<template>
  <md-card md-with-hover>
    <div @click="selectProgram" class="click-card-box">
      <div>
        <div class="title">{{item.name}}</div>
        <div class="caption">{{this.players}}</div>
      </div>
      <div class="main-box">
        <div class="eligibility-box">
          <div>
            <div class="concept">
              Eligible
            </div>
            <div class="number">{{elegible}}</div>
          </div>
          <div>
            <div class="concept">
              Ineligible
            </div>
            <div class="number cred bolder">{{item.ineligible.size}}</div>
          </div>
        </div>
        <div class="total">
          <div class="tot-title">Total</div>
          <div class="tot-number">${{total}}</div>
        </div>
      </div>

      <div class="actions">
        <md-button class="md-icon-button action-trigger">
          <md-icon class="action-trigger">visibility_off</md-icon>
        </md-button>
        <md-menu md-size="small" md-direction="top-start">
          <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
            <md-icon class="action-trigger">more_vert</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item>
              DELETE
            </md-menu-item>
            <md-menu-item>
              DUPLICATE
            </md-menu-item>
            <md-menu-item>
              EDIT
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </div>


      <div v-if="false" class="bars-with-hover">
        <div class="green" :style="paidWidth">
          <div class="hover">
            <div class="hover-title">Paid</div>
            <div class="hover-number">${{paid}}</div>
          </div>
        </div>
        <div class="gray" :style="unpaidWidth">
          <div class="hover">
            <div class="hover-title">Unpaid</div>
            <div class="hover-number">${{unpaid}}</div>
          </div>
        </div>
        <div class="red" :style="overdueWidth">
          <div class="hover">
            <div class="hover-title">Overdue</div>
            <div class="hover-number">${{overdue}}</div>
          </div>
        </div>
        <div class="blue" :style="otherWidth">
          <div class="hover">
            <div class="hover-title">Other</div>
            <div class="hover-number">${{other}}</div>
          </div>
        </div>
      </div>
    </div>
  </md-card>
</template>
<script>
import currency from '@/helpers/currency'
import { mapMutations } from 'vuex'
export default {
  props: {
    item: Object
  },
  data () {
    return {
      width: 'width: 10%'
    }
  },
  computed: {
    players () {
      let players = this.item.players.size
      if (players === 1) return '1 player'
      return players + ' players'
    },
    elegible () {
      return this.item.players.size - this.item.ineligible.size
    },
    total () {
      return currency(this.item.total)
    },
    paid () {
      return currency(this.item.paid)
    },
    paidWidth () {
      return `width: ${(this.item.paid / this.item.total) * 100}%`
    },
    unpaid () {
      return currency(this.item.unpaid)
    },
    unpaidWidth () {
      return `width: ${(this.item.unpaid / this.item.total) * 100}%`
    },
    overdue () {
      return currency(this.item.overdue)
    },
    overdueWidth () {
      return `width: ${(this.item.overdue / this.item.total) * 100}%`
    },
    other () {
      return currency(this.item.other)
    },
    otherWidth () {
      return `width: ${(this.item.other / this.item.total) * 100}%`
    }

  },
  methods: {
    ...mapMutations('clubprogramsModule', {
      setProgramSelected: 'setProgramSelected'
    }),
    selectProgram (e) {
      if (e.target.className.includes('action-trigger')) {
        return false
      }
      this.setProgramSelected(this.item.id)
    }
  }
}
</script>

