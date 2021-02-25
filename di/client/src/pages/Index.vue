<template>
  <q-page class="bg-withe window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-grey q-my-md">Login</h5>
      </div>
      <div class="row">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
          autofocus
        >
          <q-card square bordered class="q-pa-lg shadow-1">
            <q-card-section>
              <q-input
                  v-model="username"
                  label="Username"
                  type="text"
                  lazy-rules
                  :rules="
                  [
                    val => val.length || 'Has d\'introduir un nom d\'usuari'
                  ]"
                  clearable
                  square
                >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
                </template>
              </q-input>
              <q-input
                  v-model="password"
                  label="Password"
                  type="password"
                  lazy-rules
                  :rules="
                  [
                    val => val.length || 'Has d\'introduir un nom d\'usuari'
                  ]"
                  clearable
                  square
              >
                <template v-slot:prepend>
                  <q-icon name="password" />
                </template>
              </q-input>
            </q-card-section>
            <q-card-actions class="q-px-md">
              <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" type="submit"/>
            </q-card-actions>
            <q-card-section class="text-center q-pa-none">
              <p class="text-grey-6">No estàs registrat?
                <router-link to="/register">Registra't</router-link>
              </p>
            </q-card-section>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      console.log('onSubmit')
    }
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
