<template>
  <div>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Hermes App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      :mini-variant.sync="mini"
      temporary
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ user.name }}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.ref"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          @click.prevent="logout"
        >
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Admin',
  data: () => ({
    drawer: null,
    items: [
      { title: 'Inicio', icon: 'mdi-home-city', ref: { name: 'Admin' } },
      // { title: 'Mi cuenta', icon: 'mdi-account', ref: '#' },
      { title: 'Usuarios', icon: 'mdi-account-group-outline', ref: { name: 'Users' } },
    ],
    mini: false
  }),
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
