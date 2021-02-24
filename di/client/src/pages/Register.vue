<template>
  <q-page class="bg-withe window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-grey q-my-md">Registre d'usuari</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form
              @submit="onSubmit"
              @reset="onReset"
              class="q-gutter-md"
              autofocus
            >
              <q-input
                ref="fullNameRef"
                v-model="fullName"
                name="full_name"
                label="Nom complet *"
                type="text"
                lazy-rules
                :rules="[
                  val => val != null && val.length > 0 && fullNameWords || 'Has de posar el nom i els cognoms'
                ]"
                clearable
                required
                square
              >
                <template v-slot:prepend>
                  <q-icon name="perm_identity" />
                </template>
              </q-input>
              <q-input
                v-model="dni"
                label="DNI *"
                type="text"
                lazy-rules
                :rules="[ val => isValidDNI || 'Completa el DNI en format 00000000X']"
                clearable
                square
              >
                <template v-slot:prepend>
                  <q-icon name="recent_actors" />
                </template>
              </q-input>
              <q-input
                v-model="username"
                label="Username *"
                name="username"
                type="text"
                lazy-rules
                :rules="[ val => val != null && val.length > 0 || 'El nom d\'usuari és obligatori']"
                clearable
                square
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                v-model="password"
                label="Password *"
                name="password"
                type="password"
                clearable
                square
              >
                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>
              </q-input>
              <q-input
                v-model="password2"
                label="Confirm password *"
                type="password"
                lazy-rules
                :rules="
                [
                  val => val == this.password || 'Les contrasenyes no coincideixen',
                  val => this.password.length > 0 || 'Has de posar una contrasenya'
                ]"
                clearable
                square
              >
                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>
              </q-input>
              <q-card-actions class="q-px-md">
                <q-btn unelevated color="primary" type="submit" label="Registrar-se" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      fullName: '',
      dni: '',
      username: '',
      password: '',
      password2: '',
      submitEnabled: false
    }
  },
  computed: {
    fullNameWords () {
      function checkSize (size) {
        return size.length > 1
      }
      var names = this.fullName.split(' ')
      return names.length >= 3 & names.filter(checkSize).length === names.length
    },
    isValidDNI () {
      const regExp = new RegExp('[0-9]{8}[A-Z]')
      return regExp.test(this.dni)
    }
  },
  methods: {
    onSubmit () {
      console.log('On submit')
    },
    onReset () {
      this.fullName = null
      this.dni = null
      this.username = null
      this.password = null
      this.password2 = null
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
