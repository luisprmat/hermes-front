<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="id"
    class="elevation-1"
    :loading="loading"
    loading-text="Estamos cargando la información ..."
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>

        <!-- Dialog box for creating or editing user -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Nuevo Usuario
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="editedItem.document"
                      label="Documento"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="Nombres"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Apellidos"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-select
                      :items="roles"
                      label="Rol"
                      v-model="editedItem.role.id"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">¿Estás seguro de eliminar este usuario?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Id', value: 'id' },
        { text: 'Documento', value: 'document' },
        {
          text: 'Nombres',
          align: 'start',
          value: 'first_name',
        },
        {
          text: 'Apellidos',
          align: 'start',
          value: 'last_name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Rol', value: 'role.title' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      users: [],
      roles: [],
      editedIndex: -1,
      editedItem: {
        document: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 1
      },
      defaultItem: {
        document: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 3
      },
      loading: true
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Usuario' : 'Editar Usuario'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async getRoles () {
        try {
          let response = await this.$http.get('/api/v1/role', {
            headers: { 'token': this.$store.state.token }
          })
          return response.data
        } catch (e) {
          console.log(e.response.data)
        }
      },

      async getUsers () {
        try {
          let response = await this.$http.get('/api/v1/user', {
            headers: { 'token': this.$store.state.token }
          })
          return response.data
        } catch (e) {
          console.log(e.response.data)
        }
      },

      async initialize () {
        let roles = await this.getRoles()
        this.roles = roles.map(item => {
          return { value: item.id, text: item.title }
        })
        this.users = await this.getUsers()
        this.loading = false
      },

      editItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = item.id
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      async deleteItemConfirm () {
        try {
          let response = await this.$http.delete(`/api/v1/user/${this.editedIndex}`, {
            headers: { 'token': this.$store.state.token }
          })
          console.log(response.data)
          this.closeDelete()
          this.initialize()
        } catch (e) {
          console.log(e.response.data)
        }
        console.log('Deleted index', this.editedIndex)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>
