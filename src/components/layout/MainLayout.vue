<template>
<div>
<md-app>
  <md-app-toolbar class="md-primary">
    <top-toolbar></top-toolbar>
  </md-app-toolbar>
  <md-app-drawer class="left-nav" md-permanent="clipped">
    <md-list class="top-list">
      <md-list-item>
        <md-menu class="user-menu" md-size="auto" md-align-trigger="md-align-trigger" md-direction="bottom-end">
          <md-button class="" md-menu-trigger="md-menu-trigger">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>&nbsp; Diego Fortes
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
          <md-menu-content>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 1</md-menu-item>
            <md-menu-item>My Item 1</md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-list-item>
      <md-list-item>
        <md-icon>home</md-icon>
        <span class="md-list-item-text">Dashboard</span>
      </md-list-item>
      <router-link to="players" tag="md-list-item">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">Player</span>
      </router-link>
      <md-list-item>
        <md-icon>shopping_cart</md-icon>
        <span class="md-list-item-text">Make/Schedule Payment</span>
      </md-list-item>
      <md-list-item>
        <md-icon>credit_card</md-icon>
        <span class="md-list-item-text">Payments Accounts</span>
      </md-list-item>
    </md-list>
    <md-list class="bottom-list">
      <md-list-item>
        <md-icon>settings</md-icon>
        <span class="md-list-item-text">Settings</span>
      </md-list-item>
      <md-list-item>
        <md-icon>send</md-icon>
        <span class="md-list-item-text">Email Support</span>
      </md-list-item>
      <md-list-item>
        <md-icon>call</md-icon>
        <span class="md-list-item-text">Call Support</span>
      </md-list-item>
      <md-list-item>
        <md-icon>help</md-icon>
        <span class="md-list-item-text">Help</span>
      </md-list-item>
    </md-list>
  </md-app-drawer>
  <md-app-content>
    <router-view></router-view>
    <pu-message></pu-message>
  </md-app-content>
  
 
</md-app>
</div>
</template>

<script>
import TopToolbar from './TopToolbar.vue'
import PuMessage from '@/components/shared/Message.vue'
// import PuMessage from '@/components/shared/Message.vue'
export default {
  components: { TopToolbar, PuMessage },
  data: function () {
    return {
      msg: 'THEE MSAGE BIATH'
    }
  }
}
</script>

