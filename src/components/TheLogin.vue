<template>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <v-img
      height="150"
      src="@/assets/logo.svg"
    ></v-img>

    <v-card-title>Login</v-card-title>

    <v-card-text>
      <form @submit.prevent="login">
        <v-text-field
          v-model="form.document"
          :counter="20"
          label="Documento"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Contraseña"
          type="password"
          required
          outlined
        ></v-text-field>

        <v-btn
          color="primary"
          elevation="2"
          class="mr-4"
          type="submit"
          :disabled="validate"
        >
          enviar
        </v-btn>
        <v-btn @click="clear">
          limpiar
        </v-btn>
      </form>
    </v-card-text>
    <pre>{{ form }}</pre>
  </v-card>
</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    data: () => ({
      form: {
        document: '11413115',
        password: '11413115'
      },
    }),
    computed: {
      validate() {
        return !(this.form.document && this.form.password)
      }
    },
    methods: {
      clear() {
        this.form = {}
        this.documentErrors = []
      },
      async login() {
        try {
          // console.log(this.form)
          let response = await this.$http.post('/api/v1/user/login', this.form)
          let result = await Swal.fire({
            icon: 'success',
            title: 'Bienvenid@',
            text: response.data.message,
          })
          this.$router.push({ name: 'Admin' })
        } catch (e) {
          let errorMsg = 'No pudimos conectar con el servidor'
          if (e) {
            if(e.response) {
              errorMsg = e.response.data.message
            }
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMsg
          })
        }
      }
    },
  }
</script>
