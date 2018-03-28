<template>
  <div class="left-sidebar">
    <md-list class="top-list">
      <md-list-item class="user-menu">
        <md-menu md-size="auto" md-align-trigger="md-align-trigger" md-direction="bottom-end">
          <md-button class="md-primary" md-menu-trigger="md-menu-trigger">
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
      <router-link to="players" tag="md-list-item">
        <md-icon>account_circle</md-icon>
        <span class="md-list-item-text">Players</span>
      </router-link>
     <router-link to="payments" tag="md-list-item">
        <md-icon>shopping_cart</md-icon>
        <span class="md-list-item-text">Make/Schedule Payment
          <span class="notification-number">9</span>
        </span>
      </router-link>
      <md-list-item>
        <md-icon>credit_card</md-icon>
        <span class="md-list-item-text">Payments Accounts</span>
      </md-list-item>
    </md-list>
    <md-list class="bottom-list">
      <md-list-item>
        <md-icon>send</md-icon>
        <a class="md-list-item-text" href="mailto:support@getpaidup.com">
          <div>Email Support</div>
          <div>support@getpaidup.com</div>
        </a>
      </md-list-item>
      <md-list-item>
        <md-icon>call</md-icon>
        <a class="md-list-item-text" href="tel:855-764-3232">
          <div>Call Support</div>
          <div>(855) 764-3232</div>
        </a>
      </md-list-item>
      <md-list-item>
        <md-icon>help</md-icon>
        <a class="md-list-item-text" href="#">
          Help Articles
        </a>
        <md-icon>launch</md-icon>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        msg: 'THEE MSAGE BIATH'
      }
    }
  }
</script>
