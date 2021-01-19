<template>
  <div class="home">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Hermes Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo_hermes.png"
          transition="scale-transition"
          width="40"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <h3>Hermes App</h3>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :to="{ name: 'Welcome' }"
        text
        exact
      >
        <span class="mr-2">Inicio</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn
        :to="{ name: 'About' }"
        text
        exact
      >
        <span class="mr-2">Acerca de</span>
        <v-icon>info</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container style="margin-top: 64px;">
      <router-view name="landing" />
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
