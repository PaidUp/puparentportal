<template>
  <div class="clubs-cards-page">
    <div class="search-input">
      <md-field>
        <label>Search Clubs</label>
        <md-input></md-input>
      </md-field>
    </div>
    <div class="cards-layout">
      <md-card md-with-hover class="card-clubs">
        <div class="body">
          <img src="@/assets/ntxbanditos.png" alt="club" class="club-img">
          <div class="club-name">Club Orange long title second</div>
          <div class="title-info">Central Florida</div>
        </div>
        <div class="actions">
          <md-button class="md-icon-button">
            <md-icon>visibility_off</md-icon>
          </md-button>
          <md-menu md-size="small" md-direction="top-start">
            <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                VIEW SCOREBOARD AS
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
      <md-card md-with-hover class="card-clubs">
        <div class="body">
          <img src="@/assets/ntxbanditos.png" alt="club" class="club-img">
          <div class="club-name">Club Orange </div>
          <div class="title-info">Central Florida</div>
        </div>
        <div class="actions">
          <md-button class="md-icon-button">
            <md-icon>visibility_off</md-icon>
          </md-button>
          <md-menu md-size="small" md-direction="top-start">
            <md-button class="md-icon-button md-accent lblue" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
            <md-menu-content>
              <md-menu-item>
                VIEW SCOREBOARD AS
              </md-menu-item>
              <md-menu-item>
                EDIT
              </md-menu-item>
            </md-menu-content>
          </md-menu>
        </div>
      </md-card>
    </div>
  </div>

</template>

<script>
  export default {
    components: {},
    data: function () {
      return {

      }
    },
    methods: {}
  }
</script>
