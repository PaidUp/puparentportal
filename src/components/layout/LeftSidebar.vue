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
      <md-divider></md-divider>
      <md-list-item md-expand>
        <span class="md-list-item-text ca1 bold">Player Payment History</span>
        <md-list slot="md-expand">
          <md-list-item to="/players/1">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Mylo Fernandez</span>
                <br>
                <span class="caption">Isotopes Voleyball Club</span>
              </div>
            </div>
            <span class="notification-number">9</span>
          </md-list-item>
          <md-list-item to="/players/2">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Mylo Fernandez</span>
                <br>
                <span class="caption">Isotopes Voleyball Club</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Add new player
              </div>
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>
      <md-list-item md-expand>
        <span class="md-list-item-text ca1 bold">Pay New Invoice</span>
        <md-list slot="md-expand">
          <md-list-item to="/payments/1">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Mylo Fernandez</span>
                <br>
                <span class="caption">Isotopes Voleyball Club</span>
              </div>
            </div>
            <span class="notification-number">9</span>
          </md-list-item>
          <md-list-item to="/payments/2">
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Mylo Fernandez</span>
                <br>
                <span class="caption">Isotopes Voleyball Club</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Make New Payment(s)
              </div>
            </div>
          </md-list-item>
        </md-list>
      </md-list-item>
      <md-list-item md-expand>
        <span class="md-list-item-text ca1 bold">Payment Accounts</span>
        <md-list slot="md-expand">
          <md-list-item>
            <md-avatar>
              <img src="@/assets/avatar.jpg" />
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Felipe Fernandez</span>
                <br>
                <span class="caption">American Express****2341</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-avatar class="md-avatar-icon md-accent">
              <md-icon>account_balance</md-icon>
            </md-avatar>
            <div class="md-list-item-text">
              <div>
                <span>Bank of America</span>
                <br>
                <span class="caption">Account ****2414</span>
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Add New Card
              </div>
            </div>
          </md-list-item>
          <md-list-item>
            <md-icon class="add-icon">add</md-icon>
            <div class="md-list-item-text">
              <div>
                Add New Bank
              </div>
            </div>
          </md-list-item>
        </md-list>
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
