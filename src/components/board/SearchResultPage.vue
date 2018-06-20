<template>
  <div class="search-page">
    <div class="title">
      Search Results
    </div>
    <div class="not-found">
      <md-icon class="md-size-5x">search</md-icon>
      <div class="bolder">No search results found</div>
      <div>Please try again with a different search query</div>
    </div>
    <div class="table-title">Players (2)</div>
    <md-table md-card v-model="users" md-sort="name" md-sort-order="asc" class="custom-table">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
          <md-avatar class="md-small" v-if="item.id ===2">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
        </md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name" class="col-with-img">
          <md-icon class="md-size-2" v-if="item.id ===1">account_circle</md-icon>
          <md-avatar class="md-small" v-if="item.id ===2">
            <img src="@/assets/avatar.jpg" alt="img">
          </md-avatar>
          <div>
            {{ item.name }}
          </div>
        </md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
      </md-table-row>
    </md-table>

    <div class="table-title">Parents (2)</div>
    <md-table md-card v-model="users" md-sort="name" md-sort-order="asc" class="custom-table">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name" md-sort-by="name" class="col-25">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Club" md-sort-by="club" class="col-with-img">
          <img src="@/assets/ntxbanditos.png" alt="club" class="club-img">
          <div>
            {{ item.club }}
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data: function () {
      return {
        movie: 'godfather',
        users: [ {
          id: 1,
          name: 'Shawna Dubbin',
          email: 'sdubbin0@geocities.com',
          phone: '888-999-8888',
          club: 'Texas Club'
        },
        {
          id: 2,
          name: 'Odette Demageard',
          email: 'odemageard1@spotify.com',
          phone: '888-999-1111',
          club: 'Isotopes Club'
        }
        ]
      }
    },
    computed: {
      ...mapState('userModule', {
        'user': 'user'
      })
    },
    methods: {}
  }
</script>
