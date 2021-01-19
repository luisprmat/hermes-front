<template>
  <div class="home">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Welcome' }">
          <v-img
            alt="Hermes Logo"
            class="shrink mr-2"
            contain
            src="@/assets/logo_hermes.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>

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

      <v-btn
        :to="{ name: 'Login' }"
        text
        exact
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container style="margin-top: 64px;">
      <router-view name="landing" />
    </v-container>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    //
  }
}
</script>
